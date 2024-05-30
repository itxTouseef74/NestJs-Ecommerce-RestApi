import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/users/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import {CategoryEntity} from './entities/category.entity'
import { AuthorizeRoles } from 'src/users/utility/decorators/authorize-roles.decorator';



@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() currentUser: UserEntity): Promise<CategoryEntity> {
    return await this.categoriesService.create(createCategoryDto, currentUser);
  }
  

  @Get()
 async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoriesService.findOne(+id);
  }


  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Patch(':id') 
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string): Promise<{
  message: string;
     }> {
    await this.categoriesService.remove(+id);
    return {message:"Category deleted successfully."}
    

  }
}
