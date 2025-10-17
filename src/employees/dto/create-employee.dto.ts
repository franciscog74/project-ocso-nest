import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateEmployeeDto extends Employee {
    @IsString()
    @MaxLength(50)
    employeeName: string;

    @IsString()
    @MaxLength(50)
    employeeLastName: string;

    @IsString()
    @MaxLength(15)
    employeePhone: string;

    @IsString()
    @IsEmail()
    employeeEmail: string;

    @IsOptional()
    @IsObject()
    location: Location;
}
