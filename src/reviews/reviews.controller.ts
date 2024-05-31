import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticationGuard } from 'src/users/utility/guards/authentication.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/users/utility/decorators/current-user.decorator';
import { ReviewEntity } from './entities/review.entity';
import { Roles } from 'src/users/utility/common/user-roles.enum';
import { AuthorizeRoles } from 'src/users/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/users/utility/guards/authorization.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto ,  @CurrentUser() currentUser:UserEntity) : Promise<ReviewEntity> {
    return this.reviewsService.create(createReviewDto , currentUser);
  }

  @Get('')
  async findAll(productId: number) {
    return await  this.reviewsService.findAllByProduct(productId) ;
  }
   

    
   @Get()
    async findAllByProduct(@Body('productId') productId: number) {
    return await  this.reviewsService.findAllByProduct(+productId);
   }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await  this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }
  
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
