import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:"Title cannot be empty!"})
    @IsString({message:"Title should be string!"})
    title:string;

    @IsNotEmpty({message:"description cannot be empty!"})
    @IsString({message:"description should be string!"})
    description:string;
}
