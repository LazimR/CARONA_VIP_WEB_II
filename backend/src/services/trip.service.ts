import prisma from '../utils/prisma';
import { TripStatus } from '@prisma/client';

export interface CreateTripData {
  driverId: string;
  routeId: string;
  departureAt: Date;
  totalSeats: number;
  availableSeats: number;
  pricePerPerson: number;
  status?: TripStatus;
}

export interface UpdateTripData {
  driverId?: string;
  routeId?: string;
  departureAt?: Date;
  totalSeats?: number;
  availableSeats?: number;
  pricePerPerson?: number;
  status?: TripStatus;
}

export class TripService {
  async findAll() {
    return await prisma.trip.findMany({
      orderBy: {
        departureAt: 'desc',
      },
      include: {
        driver: true,
        route: true,
        passengers: {
          include: {
            passenger: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await prisma.trip.findUnique({
      where: { id },
      include: {
        driver: true,
        route: {
          include: {
            createdBy: true,
          },
        },
        passengers: {
          include: {
            passenger: true,
          },
        },
        payments: true,
        evaluations: true,
      },
    });
  }

  async findByDriverId(driverId: string) {
    return await prisma.trip.findMany({
      where: { driverId },
      orderBy: {
        departureAt: 'desc',
      },
      include: {
        driver: true,
        route: true,
        passengers: {
          include: {
            passenger: true,
          },
        },
      },
    });
  }

  async findByStatus(status: TripStatus) {
    return await prisma.trip.findMany({
      where: { status },
      orderBy: {
        departureAt: 'desc',
      },
      include: {
        driver: true,
        route: true,
      },
    });
  }

  async create(data: CreateTripData) {
    return await prisma.trip.create({
      data,
      include: {
        driver: true,
        route: true,
      },
    });
  }

  async update(id: string, data: UpdateTripData) {
    return await prisma.trip.update({
      where: { id },
      data,
      include: {
        driver: true,
        route: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.trip.delete({
      where: { id },
    });
  }
}

