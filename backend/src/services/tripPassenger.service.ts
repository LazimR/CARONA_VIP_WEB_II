import prisma from '../utils/prisma';
import { PassengerStatus } from '@prisma/client';

export interface CreateTripPassengerData {
  tripId: string;
  passengerId: string;
  status?: PassengerStatus;
}

export interface UpdateTripPassengerData {
  status?: PassengerStatus;
}

export class TripPassengerService {
  async findAll() {
    return await prisma.tripPassenger.findMany({
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
        passenger: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.tripPassenger.findUnique({
      where: { id },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        passenger: true,
      },
    });
  }

  async findByTripId(tripId: string) {
    return await prisma.tripPassenger.findMany({
      where: { tripId },
      include: {
        passenger: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByPassengerId(passengerId: string) {
    return await prisma.tripPassenger.findMany({
      where: { passengerId },
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: CreateTripPassengerData) {
    return await prisma.tripPassenger.create({
      data,
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        passenger: true,
      },
    });
  }

  async update(id: string, data: UpdateTripPassengerData) {
    return await prisma.tripPassenger.update({
      where: { id },
      data,
      include: {
        trip: {
          include: {
            driver: true,
            route: true,
          },
        },
        passenger: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.tripPassenger.delete({
      where: { id },
    });
  }
}

