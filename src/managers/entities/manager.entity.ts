import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn("uuid")
    managerId: string;

    @ApiProperty({
        default: "Sergio Marquez"
    })
    @Column("text")
    managerFullName: string;

    @ApiProperty({
        default: 15000
    })
    @Column("float")
    managerSalary: number;

    @ApiProperty({
        default: "correo@ejemplo.com"
    })
    @Column({
        type: "text",
        unique: true
    })
    managerEmail: string;

    @ApiProperty({
        default: "0123456789"
    })
    @Column("text")
    managerPhone: string;

    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    location: Location | null;

    @ApiPropertyOptional({
        type: () => User
    })
    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}
