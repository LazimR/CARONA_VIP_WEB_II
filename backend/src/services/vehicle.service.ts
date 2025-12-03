import prisma from '../utils/prisma';

export interface CreateVehicleData {
  model: string;
  plate: string;
  color?: string;
  year?: number;
  driverId: string;
}

export interface UpdateVehicleData {
  model?: string;
  plate?: string;
  color?: string;
  year?: number;
}

export class VehicleService {
  async findAll() {
    return await prisma.vehicle.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        driver: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.vehicle.findUnique({
      where: { id },
      include: {
        driver: true,
      },
    });
  }

  async findByDriverId(driverId: string) {
    return await prisma.vehicle.findMany({
      where: { driverId },
      orderBy: {
        id: 'desc',
      },
      include: {
        driver: true,
      },
    });
  }

  async create(data: CreateVehicleData) {
    return await prisma.vehicle.create({
      data,
      include: {
        driver: true,
      },
    });
  }

  async update(id: string, data: UpdateVehicleData) {
    return await prisma.vehicle.update({
      where: { id },
      data,
      include: {
        driver: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.vehicle.delete({
      where: { id },
    });
  }
}

