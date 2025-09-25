import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends User {
    @IsEmail()
    userEmail: string;

    @IsString()
    @MinLength(8)
    userPassword: string;

    @IsOptional()
    @IsIn(["Admin", "Manager", "Employee"], {
        each: true
    })
    userRoles: string[];
}
