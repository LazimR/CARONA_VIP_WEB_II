import prisma from '../utils/prisma';
import { PaymentStatus } from '@prisma/client';

export interface CreatePaymentData {
  tripId: string;
  payerId: string;
  creditCardId: string;
  value: number;
  status?: PaymentStatus;
  transactionId?: string;
}

export interface UpdatePaymentData {
  value?: number;
  status?: PaymentStatus;
  transactionId?: string;
}

export class PaymentModelService {
  async findAll() {
    return await prisma.payment.findMany({
      orderBy: {
        paymentDate: 'desc',
      },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        payer: true,
        card: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.payment.findUnique({
      where: { id },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        payer: true,
        card: true,
      },
    });
  }

  async findByTripId(tripId: string) {
    return await prisma.payment.findMany({
      where: { tripId },
      include: {
        payer: true,
        card: true,
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  }

  async findByPayerId(payerId: string) {
    return await prisma.payment.findMany({
      where: { payerId },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        card: true,
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  }

  async findByStatus(status: PaymentStatus) {
    return await prisma.payment.findMany({
      where: { status },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        payer: true,
        card: true,
      },
      orderBy: {
        paymentDate: 'desc',
      },
    });
  }

  async create(data: CreatePaymentData) {
    return await prisma.payment.create({
      data,
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        payer: true,
        card: true,
      },
    });
  }

  async update(id: string, data: UpdatePaymentData) {
    return await prisma.payment.update({
      where: { id },
      data,
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        payer: true,
        card: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.payment.delete({
      where: { id },
    });
  }
}

