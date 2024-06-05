import { Module, RequestMethod , MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './users/utility/middlewares/current-user.middleware';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}) ,TypeOrmModule.forRoot(dataSourceOptions), UsersModule, CategoriesModule, ProductsModule, ReviewsModule, OrdersModule , PaymentModule],
  controllers: [],
  providers: [],
  
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({path: '*' , method: RequestMethod.ALL});
  }
}
