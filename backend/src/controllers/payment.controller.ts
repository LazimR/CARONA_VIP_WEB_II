import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPixPayment(req: Request, res: Response) {
    const { amount, description, payerEmail, payerCpf } = req.body;

    const pixData = await this.paymentService.createPixPayment({
      amount,
      description,
      payerEmail,
      payerCpf,
    });

    res.status(201).json(pixData);
  }

  async getPaymentStatus(req: Request, res: Response) {
    const { paymentId } = req.params;

    const paymentStatus = await this.paymentService.getPaymentStatus(paymentId);

    res.json(paymentStatus);
  }

  async testMercadoPago(req: Request, res: Response) {
    const result = await this.paymentService.testMercadoPago();

    res.json(result);
  }
}

