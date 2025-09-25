import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(100)
    managerFullName: string;

    @IsNumber()
    managerSalary: number;

    @IsString()
    @IsEmail()
    managerEmail: string;

    @IsString()
    @MaxLength(16)
    managerPhone: string;

    @IsOptional()
    @IsObject()
    location: Location;
}
