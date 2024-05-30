import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException, Post  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignup } from './dto/user-signup.dto';
import { UserSignin } from './dto/user-signin.dto';
import { hash , compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';



@Injectable()
export class UsersService {

  UserService: any;

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

    
 
  async signin(userSignin:UserSignin): Promise<UserEntity>{
     
    const userExists = await this.usersRepository.createQueryBuilder('users').addSelect('users.password').where('users.email=:email' , {email:userSignin.email}).getOne()
    if (!userExists) throw new BadRequestException('Bad credentials! ');
    const matchPassword= await compare(userSignin.password , userExists.password);
    if(!matchPassword) throw new BadRequestException ('Bad Credentials!')
    delete userExists.password
    return userExists ; 
  }






  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({id})  ;
    if(!user) throw new NotFoundException('user not found!');
    return user;
     
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email:string):Promise<UserEntity>{
    return await this.usersRepository.findOneBy({email})

  }

  async accessToken(user: UserEntity): Promise<string>{
      return sign({id:user.id , email:user.email},process.env.ACCESS_TOKEN_SECRET_KEY , {expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
  }

  }

