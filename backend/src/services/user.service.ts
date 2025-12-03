import prisma from '../utils/prisma';
import { Role } from '@prisma/client';

export interface CreateUserData {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role?: Role;
  status?: boolean;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  passwordHash?: string;
  phone?: string;
  role?: Role;
  status?: boolean;
}

export class UserService {
  async findAll() {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserData) {
    return await prisma.user.create({
      data,
    });
  }

  async update(id: string, data: UpdateUserData) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

