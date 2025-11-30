import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JWTPayload } from '../types/jwt';
import { AppError, errorHandler } from './errorHandler';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error: AppError = new Error('Token de autenticação não fornecido');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    if (!process.env.JWT_SECRET) {
      const error: AppError = new Error('JWT_SECRET não configurado');
      error.statusCode = 500;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const authError: AppError = new Error('Token inválido');
      authError.statusCode = 401;
      return errorHandler(authError, req, res, next);
    }

    if (error instanceof jwt.TokenExpiredError) {
      const authError: AppError = new Error('Token expirado');
      authError.statusCode = 401;
      return errorHandler(authError, req, res, next);
    }

    return errorHandler(error as AppError, req, res, next);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      const error: AppError = new Error('Usuário não autenticado');
      error.statusCode = 401;
      return errorHandler(error, req, res, next);
    }

    if (!roles.includes(req.user.role)) {
      const error: AppError = new Error('Acesso negado. Permissão insuficiente');
      error.statusCode = 403;
      return errorHandler(error, req, res, next);
    }

    next();
  };
};

