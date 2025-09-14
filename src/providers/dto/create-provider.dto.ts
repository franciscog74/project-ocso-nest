import { IsEmail, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";

export class CreateProviderDto extends Provider {
    @IsUUID("4")
    @IsOptional()
    providerID: string;

    @IsString()
    @MaxLength(100)
    providerName: string;

    @IsEmail()
    @IsString()
    providerEmail: string;

    @IsString()
    @IsOptional()
    providerPhone: string;
}
