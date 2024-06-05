import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrdersProductsEntity } from './entities/orders-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductsModule } from 'src/products/products.module';
import { PaymentService } from 'src/payment/payment.service'; // Import PaymentService

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrdersProductsEntity, ShippingEntity]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentService], 
})
export class OrdersModule {}
