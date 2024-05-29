import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignup } from './dto/user-signup.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(UserSignup: UserSignup): Promise<UserEntity> {
    console.log('Signup request received'); 
    try {
      const userExists = await this.findUserByEmail(UserSignup.email);
      if (userExists) throw new BadRequestException('Email is not available!');
      UserSignup.password = await hash(UserSignup.password, 8);
      const user = this.usersRepository.create(UserSignup);
      const savedUser = await this.usersRepository.save(user);
      console.log('User created successfully');
      return savedUser;
    } catch (error) {
      console.error('Error during signup:', error); 
      throw new InternalServerErrorException('An error occurred during signup');
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    console.log('Finding user by email'); 
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      console.log('User found:', user); 
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new InternalServerErrorException('An error occurred while finding the user by email');
    }
  }
}
