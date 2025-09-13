import { IsEmail, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(50)
    lastName: string;

    @IsString()
    @MaxLength(15)
    phone: string;

    @IsString()
    @IsEmail()
    email: string;
}
