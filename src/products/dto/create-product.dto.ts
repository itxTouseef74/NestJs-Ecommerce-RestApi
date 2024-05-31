import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message:'Title can not be empty.'})
    @IsString()
    title:string;
    
    @IsNotEmpty({message:'description can not be empty.'})
    @IsString()
    description:string
    
    @IsNotEmpty({message:'price should not be empty'})
    @IsNumber({maxDecimalPlaces:2} , {message:'price should be number & max decimal precission 2 '})
    @IsPositive({message: 'price should be postitive number'})
    price: number
    
    @IsNotEmpty({message:'stock should not be empty.'})
    @IsNumber({} , {message:'stock should be number '})
    @Min(0 , {message: 'Stock can not be empty '})

    stock: number
    
    

    
    @IsNotEmpty({message:'image should not be empty'})
    @IsArray({message: 'image should be in array format.'})
    images: string[ ]
    

    @IsNotEmpty({message:'category should not be empty'})
    @IsNumber({} , {message:'category id  should be number '})
    
    categoryId: number
}
