import { Request, Response } from 'express';
import { TripService } from '../services/trip.service';
import { AppError } from '../middleware/errorHandler';

export class TripController {
  private tripService: TripService;

  constructor() {
    this.tripService = new TripService();
  }

  async findAll(req: Request, res: Response) {
    const trips = await this.tripService.findAll();
    res.json(trips);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const trip = await this.tripService.findById(id);

    if (!trip) {
      const error: AppError = new Error('Viagem não encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json(trip);
  }

  async findByDriverId(req: Request, res: Response) {
    const { driverId } = req.params;

    const trips = await this.tripService.findByDriverId(driverId);
    res.json(trips);
  }

  async findByStatus(req: Request, res: Response) {
    const { status } = req.params;

    const trips = await this.tripService.findByStatus(status as any);
    res.json(trips);
  }

  async create(req: Request, res: Response) {
    const { driverId, routeId, departureAt, totalSeats, availableSeats, pricePerPerson, status } = req.body;

    if (!driverId || !routeId || !departureAt || !totalSeats || availableSeats === undefined || !pricePerPerson) {
      const error: AppError = new Error(
        'ID do motorista, ID da rota, data de partida, total de assentos, assentos disponíveis e preço por pessoa são obrigatórios'
      );
      error.statusCode = 400;
      throw error;
    }

    const trip = await this.tripService.create({
      driverId,
      routeId,
      departureAt: new Date(departureAt),
      totalSeats,
      availableSeats,
      pricePerPerson,
      status,
    });
    res.status(201).json(trip);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { driverId, routeId, departureAt, totalSeats, availableSeats, pricePerPerson, status } = req.body;

    const updateData: any = {};
    if (driverId) updateData.driverId = driverId;
    if (routeId) updateData.routeId = routeId;
    if (departureAt) updateData.departureAt = new Date(departureAt);
    if (totalSeats !== undefined) updateData.totalSeats = totalSeats;
    if (availableSeats !== undefined) updateData.availableSeats = availableSeats;
    if (pricePerPerson !== undefined) updateData.pricePerPerson = pricePerPerson;
    if (status) updateData.status = status;

    const trip = await this.tripService.update(id, updateData);
    res.json(trip);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.tripService.delete(id);
    res.status(204).send();
  }
}

