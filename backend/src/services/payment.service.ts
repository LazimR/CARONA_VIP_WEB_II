import { MercadoPagoConfig, Payment } from 'mercadopago';

export interface CreatePixPaymentParams {
  amount?: number;
  description?: string;
  payerEmail?: string;
  payerCpf?: string;
}

export class PaymentService {
  private client: MercadoPagoConfig;
  private paymentClient: Payment;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-520972345384052-102817-3a8cf488371b370876833fa6850e3c2d-298392239',
    });
    this.paymentClient = new Payment(this.client);
  }

  async createPixPayment(params: CreatePixPaymentParams) {
    const {
      amount = 0.5,
      description = 'Carona VIP - Pagamento PIX',
      payerEmail = 'andressagomesrp@gmail.com',
      payerCpf = '08699071310',
    } = params;

    const body = {
      transaction_amount: amount,
      description,
      payment_method_id: 'pix',
      payer: {
        email: payerEmail,
        identification: {
          type: 'CPF',
          number: payerCpf,
        },
      },
    };

    console.log('Criando pagamento PIX...', { transactionAmount: amount, description });

    const payment = await this.paymentClient.create({ body });
    console.log('Pagamento PIX criado com sucesso! ID:', payment.id);

    const qr_code_base64 = payment.point_of_interaction?.transaction_data?.qr_code_base64;
    const qr_code_text = payment.point_of_interaction?.transaction_data?.qr_code;
    const paymentId = payment.id;

    if (!qr_code_base64 || !qr_code_text) {
      throw new Error('Não foi possível obter os dados do PIX');
    }

    return {
      payment_id: paymentId,
      qr_code_base64,
      qr_code_text,
      amount,
      expires_in: 30,
    };
  }

  async getPaymentStatus(paymentId: string) {
    const payment = await this.paymentClient.get({ id: paymentId });

    return {
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
      transaction_amount: payment.transaction_amount,
      date_approved: payment.date_approved,
    };
  }

  async testMercadoPago() {
    const testBody = {
      transaction_amount: 0.01,
      description: 'Teste de conectividade',
      payment_method_id: 'pix',
      payer: {
        email: 'test_user_123456@testuser.com',
      },
    };

    const payment = await this.paymentClient.create({ body: testBody });

    return {
      success: true,
      message: 'Conectividade com Mercado Pago OK',
      payment_id: payment.id,
      status: payment.status,
    };
  }
}

