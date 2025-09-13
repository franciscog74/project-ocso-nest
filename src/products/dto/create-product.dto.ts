import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsUUID("4")
    @IsOptional()
    productID: string;

    @IsString()
    @MaxLength(40)
    productName: string;

    @IsNumber()
    price: number;

    @IsInt()
    sealCount: number;

    @IsUUID("4")
    provider: string;
}
