import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AppError } from '../middleware/errorHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.userService.findById(id);

    if (!user) {
      const error: AppError = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(user);
  }

  async create(req: Request, res: Response) {
    const { name, email, passwordHash, phone, role, status } = req.body;

    if (!name || !email || !passwordHash) {
      const error: AppError = new Error('Nome, email e senha são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    const user = await this.userService.create({
      name,
      email,
      passwordHash,
      phone,
      role,
      status,
    });
    res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, passwordHash, phone, role, status } = req.body;

    const user = await this.userService.update(id, {
      name,
      email,
      passwordHash,
      phone,
      role,
      status,
    });
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.delete(id);
    res.status(204).send();
  }
}

