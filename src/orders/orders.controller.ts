import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { CurrentUser } from 'src/users/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import { AuthorizeRoles } from 'src/users/utility/decorators/authorize-roles.decorator';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() currentUser: UserEntity): Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderEntity> {
    return await this.ordersService.findOne(+id);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Put(':id')
    async update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto , @CurrentUser() currentUser:UserEntity) {
    return await this.ordersService.update(+id, updateOrderStatusDto , currentUser);
  }


  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Put('cancel/:id')

  async cancelled(@Param('id') id:string, @CurrentUser() currentUser:UserEntity){
     return await this.ordersService.cancelled(+id, currentUser)
  }

  

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(+id);
    return {message:`Order with id ${id} has been successfully removed.`};
  }
}
