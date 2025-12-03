import prisma from '../utils/prisma';

export interface CreateRouteData {
  origin: string;
  destination: string;
  distanceKm?: number;
  createdById: string;
}

export interface UpdateRouteData {
  origin?: string;
  destination?: string;
  distanceKm?: number;
}

export class RouteService {
  async findAll() {
    return await prisma.route.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        createdBy: true,
      },
    });
  }

  async findById(id: string) {
    return await prisma.route.findUnique({
      where: { id },
      include: {
        createdBy: true,
        trips: true,
      },
    });
  }

  async findByCreatedById(createdById: string) {
    return await prisma.route.findMany({
      where: { createdById },
      orderBy: {
        id: 'desc',
      },
      include: {
        createdBy: true,
      },
    });
  }

  async create(data: CreateRouteData) {
    return await prisma.route.create({
      data,
      include: {
        createdBy: true,
      },
    });
  }

  async update(id: string, data: UpdateRouteData) {
    return await prisma.route.update({
      where: { id },
      data,
      include: {
        createdBy: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.route.delete({
      where: { id },
    });
  }
}

