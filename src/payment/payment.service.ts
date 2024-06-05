import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async createCardPaymentMethod(token: string): Promise<string> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: { token },
      });

      return paymentMethod.id;
    } catch (error) {
      console.error('Error creating card payment method:', error);
      throw error;
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string,
    paymentMethodId: string,
    returnUrl: string
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        confirm: true, // Automatically confirm the payment intent
        return_url: returnUrl, // Include the return URL
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }
}
