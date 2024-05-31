import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthorizeRoles } from 'src/users/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';
import { CurrentUser } from 'src/users/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto , @CurrentUser() currentUser:UserEntity): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto , currentUser) ;
  }

  @Get()
 async findAll(): Promise<ProductEntity[]> {
    return await  this.productsService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
 @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto ,  @CurrentUser() currentUser:UserEntity): Promise<ProductEntity> {
    return await this.productsService.update(+id, updateProductDto ,  currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
