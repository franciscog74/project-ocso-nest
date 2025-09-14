import { IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto extends Product {
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

    @IsString()
    @IsUUID("4")
    provider: Provider;
}
