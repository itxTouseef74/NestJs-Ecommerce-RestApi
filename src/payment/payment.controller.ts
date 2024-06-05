import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('add-card')
  async addCardPaymentMethod(@Body() body: { token: string }) {
    try {
      const paymentMethodId = await this.paymentService.createCardPaymentMethod(body.token);
      return {
        paymentMethodId,
      };
    } catch (error) {
      throw new HttpException('Failed to add card payment method', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('confirm-payment')
  async confirmPayment(@Body() body: { amount: number, currency: string, token: string, returnUrl: string }) {
    try {
      
      const paymentMethodId = await this.paymentService.createCardPaymentMethod(body.token);

    
      const paymentIntent = await this.paymentService.createPaymentIntent(body.amount, body.currency, paymentMethodId, body.returnUrl);

      return {
        paymentIntent,
      };
    } catch (error) {
      throw new HttpException('Failed to confirm payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
