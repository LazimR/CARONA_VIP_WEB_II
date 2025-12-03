import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Carona VIP API',
    version: '1.0.0',
    description: 'API RESTful para o sistema de caronas Carona VIP',
    contact: {
      name: 'Suporte API',
      email: 'suporte@caronavip.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Servidor de desenvolvimento',
    },
    {
      url: 'https://api.caronavip.com',
      description: 'Servidor de produção',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT no formato: Bearer <token>',
      },
    },
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'passwordHash'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'ID único do usuário',
          },
          name: {
            type: 'string',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário',
          },
          passwordHash: {
            type: 'string',
            description: 'Hash da senha do usuário',
          },
          phone: {
            type: 'string',
            description: 'Telefone do usuário',
          },
          role: {
            type: 'string',
            enum: ['STANDARD', 'DRIVER', 'ADMIN'],
            description: 'Papel do usuário no sistema',
          },
          status: {
            type: 'boolean',
            description: 'Status ativo/inativo do usuário',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação',
          },
        },
      },
      CreditCard: {
        type: 'object',
        required: ['maskedNumber', 'brand', 'token', 'expirationDate', 'userId'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          maskedNumber: {
            type: 'string',
            description: 'Número do cartão mascarado',
          },
          brand: {
            type: 'string',
            description: 'Bandeira do cartão',
          },
          token: {
            type: 'string',
            description: 'Token do cartão',
          },
          expirationDate: {
            type: 'string',
            description: 'Data de expiração',
          },
          nickname: {
            type: 'string',
            description: 'Apelido do cartão',
          },
          userId: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
      Vehicle: {
        type: 'object',
        required: ['model', 'plate', 'driverId'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          model: {
            type: 'string',
            description: 'Modelo do veículo',
          },
          plate: {
            type: 'string',
            description: 'Placa do veículo',
          },
          color: {
            type: 'string',
            description: 'Cor do veículo',
          },
          year: {
            type: 'integer',
            description: 'Ano do veículo',
          },
          driverId: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
      Route: {
        type: 'object',
        required: ['origin', 'destination', 'createdById'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          origin: {
            type: 'string',
            description: 'Origem da rota',
          },
          destination: {
            type: 'string',
            description: 'Destino da rota',
          },
          distanceKm: {
            type: 'number',
            format: 'float',
            description: 'Distância em quilômetros',
          },
          createdById: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
      Trip: {
        type: 'object',
        required: ['driverId', 'routeId', 'departureAt', 'totalSeats', 'availableSeats', 'pricePerPerson'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          driverId: {
            type: 'string',
            format: 'uuid',
          },
          routeId: {
            type: 'string',
            format: 'uuid',
          },
          departureAt: {
            type: 'string',
            format: 'date-time',
            description: 'Data e hora de partida',
          },
          totalSeats: {
            type: 'integer',
            description: 'Total de assentos',
          },
          availableSeats: {
            type: 'integer',
            description: 'Assentos disponíveis',
          },
          pricePerPerson: {
            type: 'number',
            format: 'float',
            description: 'Preço por pessoa',
          },
          status: {
            type: 'string',
            enum: ['OPEN', 'IN_PROGRESS', 'FINISHED', 'CANCELED'],
            description: 'Status da viagem',
          },
        },
      },
      TripPassenger: {
        type: 'object',
        required: ['tripId', 'passengerId'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          tripId: {
            type: 'string',
            format: 'uuid',
          },
          passengerId: {
            type: 'string',
            format: 'uuid',
          },
          status: {
            type: 'string',
            enum: ['PENDING', 'CONFIRMED', 'CANCELED'],
            description: 'Status do passageiro',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Payment: {
        type: 'object',
        required: ['tripId', 'payerId', 'creditCardId', 'value'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          tripId: {
            type: 'string',
            format: 'uuid',
          },
          payerId: {
            type: 'string',
            format: 'uuid',
          },
          creditCardId: {
            type: 'string',
            format: 'uuid',
          },
          value: {
            type: 'number',
            format: 'float',
            description: 'Valor do pagamento',
          },
          status: {
            type: 'string',
            enum: ['PAID', 'FAILED', 'REFUNDED'],
            description: 'Status do pagamento',
          },
          paymentDate: {
            type: 'string',
            format: 'date-time',
          },
          transactionId: {
            type: 'string',
            description: 'ID da transação',
          },
        },
      },
      Evaluation: {
        type: 'object',
        required: ['tripId', 'evaluatorId', 'evaluatedId', 'rating'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          tripId: {
            type: 'string',
            format: 'uuid',
          },
          evaluatorId: {
            type: 'string',
            format: 'uuid',
          },
          evaluatedId: {
            type: 'string',
            format: 'uuid',
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            description: 'Nota de 1 a 5',
          },
          comment: {
            type: 'string',
            description: 'Comentário da avaliação',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Status do erro',
          },
          message: {
            type: 'string',
            description: 'Mensagem de erro',
          },
        },
      },
    },
    responses: {
      NotFound: {
        description: 'Recurso não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      BadRequest: {
        description: 'Requisição inválida',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      InternalServerError: {
        description: 'Erro interno do servidor',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'Operações de autenticação (registro, login)',
    },
    {
      name: 'Users',
      description: 'Operações relacionadas a usuários',
    },
    {
      name: 'Credit Cards',
      description: 'Operações relacionadas a cartões de crédito',
    },
    {
      name: 'Vehicles',
      description: 'Operações relacionadas a veículos',
    },
    {
      name: 'Routes',
      description: 'Operações relacionadas a rotas',
    },
    {
      name: 'Trips',
      description: 'Operações relacionadas a viagens',
    },
    {
      name: 'Trip Passengers',
      description: 'Operações relacionadas a passageiros de viagens',
    },
    {
      name: 'Payments',
      description: 'Operações relacionadas a pagamentos (Mercado Pago)',
    },
    {
      name: 'Payment Models',
      description: 'Operações relacionadas a pagamentos (banco de dados)',
    },
    {
      name: 'Evaluations',
      description: 'Operações relacionadas a avaliações',
    },
    {
      name: 'Health',
      description: 'Verificação de saúde da API',
    },
  ],
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

