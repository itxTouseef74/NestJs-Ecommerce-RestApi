import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";


export class OrderedProductsDto {

  @IsNotEmpty()
  id: number;
  @IsNumber({maxDecimalPlaces: 2}, {message:'Price should be number and max decimal precission 2'})
  @IsPositive({ message: 'Price must be a positive number' })
  product_unit_price: number;

  @IsNumber({maxDecimalPlaces: 2}, {message:'Quantity should be number and max decimal precission 2'})
  @IsPositive({ message: 'Quantity must be a positive number' })
  product_quantity: number;
  
  }