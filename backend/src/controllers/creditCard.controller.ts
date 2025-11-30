import { Request, Response } from 'express';
import { CreditCardService } from '../services/creditCard.service';
import { AppError } from '../middleware/errorHandler';

export class CreditCardController {
  private creditCardService: CreditCardService;

  constructor() {
    this.creditCardService = new CreditCardService();
  }

  async findAll(req: Request, res: Response) {
    const creditCards = await this.creditCardService.findAll();
    res.json(creditCards);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const creditCard = await this.creditCardService.findById(id);

    if (!creditCard) {
      const error: AppError = new Error('Cartão de crédito não encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json(creditCard);
  }

  async findByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const creditCards = await this.creditCardService.findByUserId(userId);
    res.json(creditCards);
  }

  async create(req: Request, res: Response) {
    const { maskedNumber, brand, token, expirationDate, nickname, userId } = req.body;

    if (!maskedNumber || !brand || !token || !expirationDate || !userId) {
      const error: AppError = new Error(
        'Número mascarado, bandeira, token, data de expiração e ID do usuário são obrigatórios'
      );
      error.statusCode = 400;
      throw error;
    }

    const creditCard = await this.creditCardService.create({
      maskedNumber,
      brand,
      token,
      expirationDate,
      nickname,
      userId,
    });
    res.status(201).json(creditCard);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { maskedNumber, brand, token, expirationDate, nickname } = req.body;

    const creditCard = await this.creditCardService.update(id, {
      maskedNumber,
      brand,
      token,
      expirationDate,
      nickname,
    });
    res.json(creditCard);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.creditCardService.delete(id);
    res.status(204).send();
  }
}

