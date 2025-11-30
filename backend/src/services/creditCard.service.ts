import prisma from '../utils/prisma';

export interface CreateCreditCardData {
  maskedNumber: string;
  brand: string;
  token: string;
  expirationDate: string;
  nickname?: string;
  userId: string;
}

export interface UpdateCreditCardData {
  maskedNumber?: string;
  brand?: string;
  token?: string;
  expirationDate?: string;
  nickname?: string;
}

export class CreditCardService {
  async findAll() {
    return await prisma.creditCard.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findById(id: string) {
    return await prisma.creditCard.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return await prisma.creditCard.findMany({
      where: { userId },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async create(data: CreateCreditCardData) {
    return await prisma.creditCard.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: UpdateCreditCardData) {
    return await prisma.creditCard.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.creditCard.delete({
      where: { id },
    });
  }
}

