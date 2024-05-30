import { IsNotEmpty, IsString} from "class-validator";
import { UserSignin } from "./user-signin.dto";


export class UserSignup extends UserSignin{
    @IsNotEmpty({message:"Name can not be empty"})
    @IsString({message:"Name should be a string"})
    name:string;
    


}