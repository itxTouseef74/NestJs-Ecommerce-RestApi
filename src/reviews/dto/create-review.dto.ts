import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message:"productId should not be empty."})
    @IsNumber({},{message:"productId must be a number"})
    productId:number;

    @IsNotEmpty({message:"ratings should not be empty."})
    @IsNumber({},{message:"ratings must be a number"})
    ratings:number;
    
    @IsNotEmpty({message:"comment should not be empty."})
    @IsString()
    comment:string;
}
