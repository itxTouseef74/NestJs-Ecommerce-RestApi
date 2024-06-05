import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  shippingAddress: any;

  @IsNotEmpty()
  orderedProducts: { id: number; product_quantity: number; product_unit_price: number }[];

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string ;

  @IsString()
  @IsNotEmpty()
  paymentMethodId: string ;

  @IsString()
  @IsNotEmpty()
  returnUrl: string ;
}
