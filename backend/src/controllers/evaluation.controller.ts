import { Request, Response } from 'express';
import { EvaluationService } from '../services/evaluation.service';
import { AppError } from '../middleware/errorHandler';

export class EvaluationController {
  private evaluationService: EvaluationService;

  constructor() {
    this.evaluationService = new EvaluationService();
  }

  async findAll(req: Request, res: Response) {
    const evaluations = await this.evaluationService.findAll();
    res.json(evaluations);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const evaluation = await this.evaluationService.findById(id);

    if (!evaluation) {
      const error: AppError = new Error('Avaliação não encontrada');
      error.statusCode = 404;
      throw error;
    }

    res.json(evaluation);
  }

  async findByTripId(req: Request, res: Response) {
    const { tripId } = req.params;

    const evaluations = await this.evaluationService.findByTripId(tripId);
    res.json(evaluations);
  }

  async findByEvaluatedId(req: Request, res: Response) {
    const { evaluatedId } = req.params;

    const evaluations = await this.evaluationService.findByEvaluatedId(evaluatedId);
    res.json(evaluations);
  }

  async findByEvaluatorId(req: Request, res: Response) {
    const { evaluatorId } = req.params;

    const evaluations = await this.evaluationService.findByEvaluatorId(evaluatorId);
    res.json(evaluations);
  }

  async create(req: Request, res: Response) {
    const { tripId, evaluatorId, evaluatedId, rating, comment } = req.body;

    if (!tripId || !evaluatorId || !evaluatedId || !rating) {
      const error: AppError = new Error(
        'ID da viagem, ID do avaliador, ID do avaliado e nota são obrigatórios'
      );
      error.statusCode = 400;
      throw error;
    }

    if (rating < 1 || rating > 5) {
      const error: AppError = new Error('A nota deve estar entre 1 e 5');
      error.statusCode = 400;
      throw error;
    }

    const evaluation = await this.evaluationService.create({
      tripId,
      evaluatorId,
      evaluatedId,
      rating,
      comment,
    });
    res.status(201).json(evaluation);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      const error: AppError = new Error('A nota deve estar entre 1 e 5');
      error.statusCode = 400;
      throw error;
    }

    const evaluation = await this.evaluationService.update(id, { rating, comment });
    res.json(evaluation);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.evaluationService.delete(id);
    res.status(204).send();
  }
}

