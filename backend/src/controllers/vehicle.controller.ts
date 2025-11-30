import { Request, Response } from 'express';
import { VehicleService } from '../services/vehicle.service';
import { AppError } from '../middleware/errorHandler';

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  async findAll(req: Request, res: Response) {
    const vehicles = await this.vehicleService.findAll();
    res.json(vehicles);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const vehicle = await this.vehicleService.findById(id);

    if (!vehicle) {
      const error: AppError = new Error('Veículo não encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(vehicle);
  }

  async findByDriverId(req: Request, res: Response) {
    const { driverId } = req.params;

    const vehicles = await this.vehicleService.findByDriverId(driverId);
    res.json(vehicles);
  }

  async create(req: Request, res: Response) {
    const { model, plate, color, year, driverId } = req.body;

    if (!model || !plate || !driverId) {
      const error: AppError = new Error('Modelo, placa e ID do motorista são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    const vehicle = await this.vehicleService.create({
      model,
      plate,
      color,
      year,
      driverId,
    });
    res.status(201).json(vehicle);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { model, plate, color, year } = req.body;

    const vehicle = await this.vehicleService.update(id, {
      model,
      plate,
      color,
      year,
    });
    res.json(vehicle);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.vehicleService.delete(id);
    res.status(204).send();
  }
}

