import { IsNotEmpty, IsString } from "class-validator";

export class CreateShippingDto{
    @IsNotEmpty({message:"Phone is required"})
    @IsString({message:"Phone must be a string"})
    phone: string;

    @IsNotEmpty({message:"address is required"})
    @IsString({message:"address must be a string"})
    address: string;

    @IsNotEmpty({message:"city is required"})
    @IsString({message:"city must be a string"})
    city: string;

    @IsNotEmpty({message:"state is required"})
    @IsString({message:"state must be a string"})
    state: string;

    @IsNotEmpty({message:"country is required"})
    @IsString({message:"country must be a string"})
    country: string;

    @IsNotEmpty({message:"postcode is required"})
    @IsString({message:"postcode must be a string"})
    postcode: string;

    @IsNotEmpty({message:"name is required"})
    @IsString({message:"name must be a string"})
    name: string;

    @IsNotEmpty({message:"email is required"})
    @IsString({message:"email must be a string"})
    email: string;

}