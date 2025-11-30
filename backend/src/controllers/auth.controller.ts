import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginCredentials, RegisterData } from '../types/jwt';
import { AppError } from '../middleware/errorHandler';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const { name, email, password, phone, role } = req.body as RegisterData;

    if (!name || !email || !password) {
      const error: AppError = new Error('Nome, email e senha são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error: AppError = new Error('A senha deve ter no mínimo 6 caracteres');
      error.statusCode = 400;
      throw error;
    }

    const result = await this.authService.register({
      name,
      email,
      password,
      phone,
      role,
    });

    res.status(201).json(result);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body as LoginCredentials;

    if (!email || !password) {
      const error: AppError = new Error('Email e senha são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    const result = await this.authService.login({ email, password });

    res.json(result);
  }

  async me(req: Request, res: Response) {
    // Este método será usado com o middleware authenticate
    // req.user será populado pelo middleware
    res.json({
      message: 'Token válido',
      user: (req as any).user,
    });
  }
}

