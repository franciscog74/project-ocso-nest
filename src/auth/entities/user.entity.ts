import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @ApiProperty({
        default: "user@gmail.com"
    })
    @Column({
        type: "text",
        unique: true
    })
    userEmail: string;

    @ApiProperty({
        default: "password"
    })
    @Column("text")
    userPassword: string;

    @ApiProperty({
        default: ["Employee"]
    })
    @Column({
        type: "text",
        default: ["Employee"],
        array: true
    })
    userRoles: string[];

    @OneToOne(() => Manager)
    manager: Manager;

    @OneToOne(() => Employee)
    employee: Employee;
}
