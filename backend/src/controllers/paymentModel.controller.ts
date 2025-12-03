import { Request, Response } from 'express';
import { PaymentModelService } from '../services/paymentModel.service';
import { AppError } from '../middleware/errorHandler';

export class PaymentModelController {
  private paymentModelService: PaymentModelService;

  constructor() {
    this.paymentModelService = new PaymentModelService();
  }

  async findAll(req: Request, res: Response) {
    const payments = await this.paymentModelService.findAll();
    res.json(payments);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const payment = await this.paymentModelService.findById(id);

    if (!payment) {
      const error: AppError = new Error('Pagamento não encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(payment);
  }

  async findByTripId(req: Request, res: Response) {
    const { tripId } = req.params;

    const payments = await this.paymentModelService.findByTripId(tripId);
    res.json(payments);
  }

  async findByPayerId(req: Request, res: Response) {
    const { payerId } = req.params;

    const payments = await this.paymentModelService.findByPayerId(payerId);
    res.json(payments);
  }

  async findByStatus(req: Request, res: Response) {
    const { status } = req.params;

    const payments = await this.paymentModelService.findByStatus(status as any);
    res.json(payments);
  }

  async create(req: Request, res: Response) {
    const { tripId, payerId, creditCardId, value, status, transactionId } = req.body;

    if (!tripId || !payerId || !creditCardId || !value) {
      const error: AppError = new Error(
        'ID da viagem, ID do pagador, ID do cartão de crédito e valor são obrigatórios'
      );
      error.statusCode = 400;
      throw error;
    }

    const payment = await this.paymentModelService.create({
      tripId,
      payerId,
      creditCardId,
      value,
      status,
      transactionId,
    });
    res.status(201).json(payment);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { value, status, transactionId } = req.body;

    const payment = await this.paymentModelService.update(id, {
      value,
      status,
      transactionId,
    });
    res.json(payment);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.paymentModelService.delete(id);
    res.status(204).send();
  }
}

