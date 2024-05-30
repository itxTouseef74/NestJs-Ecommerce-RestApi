import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignup } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignin } from './dto/user-signin.dto';
import { CurrentUser } from './utility/decorators/current-user.decorator';
import { AuthenticationGuard } from './utility/guards/authentication.guard';
import { AuthorizeRoles } from './utility/decorators/authorize-roles.decorator';
import { Roles } from './utility/common/user-roles.enum';
import { AuthorizeGuard } from './utility/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Post('signup')
async  signup(@Body() UserSignup: UserSignup):Promise<{user:UserEntity}>{
  return {user: await this.usersService.signup(UserSignup)};

 }

@Post('signin')
async signin(@Body() userSignin: UserSignin): Promise<{
  accessToken: string;
  user: UserEntity;
   }>{

 const user = await  this.usersService.signin(userSignin)
 const accessToken = await this.usersService.accessToken(user)
 return {accessToken , user}
}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
   
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard , AuthorizeGuard)
  @Get('all')
  async findAll() : Promise<UserEntity[]>{
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await  this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser:UserEntity ): UserEntity{
 return currentUser;
  }
}
