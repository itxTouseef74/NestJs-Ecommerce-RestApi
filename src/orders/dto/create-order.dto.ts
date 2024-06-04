import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateShippingDto } from "./create-shipping.dto";
import { OrderedProductsDto } from "./ordered-products.dto";

export class CreateOrderDto {
    @ValidateNested()
    @Type(() => CreateShippingDto)
    shippingAddress: CreateShippingDto;

    @ValidateNested({ each: true })
    @Type(() => OrderedProductsDto)
    orderedProducts: OrderedProductsDto[];
}
