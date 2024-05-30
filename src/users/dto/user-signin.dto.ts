import { IsEmail, IsNotEmpty,MinLength } from "class-validator";


export class UserSignin{
 
    @IsEmail({},{message:"Email should be a valid email"})
    @IsNotEmpty({message:"Email can not be empty"})
    email:string;
    @IsNotEmpty({message:"Password can not be empty"})
    @MinLength(4 ,{message:"Password must be at least 4 characters"})
    password:string;

   
}