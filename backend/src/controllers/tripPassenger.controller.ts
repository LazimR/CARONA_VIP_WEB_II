import { Request, Response } from 'express';
import { TripPassengerService } from '../services/tripPassenger.service';
import { AppError } from '../middleware/errorHandler';

export class TripPassengerController {
  private tripPassengerService: TripPassengerService;

  constructor() {
    this.tripPassengerService = new TripPassengerService();
  }

  async findAll(req: Request, res: Response) {
    const tripPassengers = await this.tripPassengerService.findAll();
    res.json(tripPassengers);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const tripPassenger = await this.tripPassengerService.findById(id);

    if (!tripPassenger) {
      const error: AppError = new Error('Registro de passageiro não encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(tripPassenger);
  }

  async findByTripId(req: Request, res: Response) {
    const { tripId } = req.params;

    const tripPassengers = await this.tripPassengerService.findByTripId(tripId);
    res.json(tripPassengers);
  }

  async findByPassengerId(req: Request, res: Response) {
    const { passengerId } = req.params;

    const tripPassengers = await this.tripPassengerService.findByPassengerId(passengerId);
    res.json(tripPassengers);
  }

  async create(req: Request, res: Response) {
    const { tripId, passengerId, status } = req.body;

    if (!tripId || !passengerId) {
      const error: AppError = new Error('ID da viagem e ID do passageiro são obrigatórios');
      error.statusCode = 400;
      throw error;
    }

    const tripPassenger = await this.tripPassengerService.create({
      tripId,
      passengerId,
      status,
    });
    res.status(201).json(tripPassenger);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const tripPassenger = await this.tripPassengerService.update(id, { status });
    res.json(tripPassenger);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.tripPassengerService.delete(id);
    res.status(204).send();
  }
}

