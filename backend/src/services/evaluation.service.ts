import prisma from '../utils/prisma';

export interface CreateEvaluationData {
  tripId: string;
  evaluatorId: string;
  evaluatedId: string;
  rating: number;
  comment?: string;
}

export interface UpdateEvaluationData {
  rating?: number;
  comment?: string;
}

export class EvaluationService {
  async findAll() {
    return await prisma.evaluation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        evaluator: true,
        evaluated: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.evaluation.findUnique({
      where: { id },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        evaluator: true,
        evaluated: true,
      },
    });
  }

  async findByTripId(tripId: string) {
    return await prisma.evaluation.findMany({
      where: { tripId },
      include: {
        evaluator: true,
        evaluated: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByEvaluatedId(evaluatedId: string) {
    return await prisma.evaluation.findMany({
      where: { evaluatedId },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        evaluator: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByEvaluatorId(evaluatorId: string) {
    return await prisma.evaluation.findMany({
      where: { evaluatorId },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        evaluated: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: CreateEvaluationData) {
    return await prisma.evaluation.create({
      data,
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        evaluator: true,
        evaluated: true,
      },
    });
  }

  async update(id: string, data: UpdateEvaluationData) {
    return await prisma.evaluation.update({
      where: { id },
      data,
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        evaluator: true,
        evaluated: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.evaluation.delete({
      where: { id },
    });
  }
}

