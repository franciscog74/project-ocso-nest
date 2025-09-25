import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeId: string;

    @ApiProperty({
        default: "Juan"
    })
    @Column({ type: "text" })
    employeeName: string;

    @ApiProperty({
        default: "Perez"
    })
    @Column({ type: "text" })
    employeeLastName: string;

    @ApiProperty({
        default: "1234567890"
    })
    @Column({ type: "text" })
    employeePhone: string;

    @ApiProperty({
        default: "correo@ejemplo.com"
    })
    @Column({
        type: "text",
        unique: true
    })
    employeeEmail: string;

    @Column({
        type: "text",
        nullable: true
    })
    employeePhoto: string;
    
    @ApiPropertyOptional({
        type: () => Location
    })
    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;

    @ApiPropertyOptional({
        type: () => User
    })
    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}
