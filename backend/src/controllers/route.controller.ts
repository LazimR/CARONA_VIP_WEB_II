import { Request, Response } from 'express';
import { RouteService } from '../services/route.service';
import { AppError } from '../middleware/errorHandler';

export class RouteController {
  private routeService: RouteService;

  constructor() {
    this.routeService = new RouteService();
  }

  async findAll(req: Request, res: Response) {
    const routes = await this.routeService.findAll();
    res.json(routes);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const route = await this.routeService.findById(id);

    if (!route) {
      const error: AppError = new Error('Rota não encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json(route);
  }

  async findByCreatedById(req: Request, res: Response) {
    const { createdById } = req.params;

    const routes = await this.routeService.findByCreatedById(createdById);
    res.json(routes);
  }

  async create(req: Request, res: Response) {
    const { origin, destination, distanceKm, createdById } = req.body;

    if (!origin || !destination || !createdById) {
      const error: AppError = new Error('Origem, destino e ID do criador são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    const route = await this.routeService.create({
      origin,
      destination,
      distanceKm,
      createdById,
    });
    res.status(201).json(route);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { origin, destination, distanceKm } = req.body;

    const route = await this.routeService.update(id, {
      origin,
      destination,
      distanceKm,
    });
    res.json(route);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.routeService.delete(id);
    res.status(204).send();
  }
}

