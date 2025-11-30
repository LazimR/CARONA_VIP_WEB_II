import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/jwt';
import { Role } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const { name, email, password, phone, role } = data;

    // Verificar se o email já existe
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      const error: AppError = new Error('Email já cadastrado');
      error.statusCode = 400;
      throw error;
    }

    // Hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const user = await this.userService.create({
      name,
      email,
      passwordHash,
      phone,
      role: (role as Role) || Role.STANDARD,
      status: true,
    });

    // Gerar token JWT
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || undefined,
      },
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password } = credentials;

    // Buscar usuário
    const user = await this.userService.findByEmail(email);
    if (!user) {
      const error: AppError = new Error('Email ou senha inválidos');
      error.statusCode = 401;
      throw error;
    }

    // Verificar se o usuário está ativo
    if (!user.status) {
      const error: AppError = new Error('Usuário inativo');
      error.statusCode = 403;
      throw error;
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      const error: AppError = new Error('Email ou senha inválidos');
      error.statusCode = 401;
      throw error;
    }

    // Gerar token JWT
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || undefined,
      },
    };
  }

  private generateToken(payload: { id: string; email: string; role: string }): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado');
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
  }

  async verifyToken(token: string) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado');
    }

    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

