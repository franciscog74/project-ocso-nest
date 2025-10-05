import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("increment")
    locationId: number;

    @ApiProperty({
        default: "Ocso Juriquilla"
    })
    @Column("text")
    locationName: string;

    @ApiProperty({
        default: "Calle 1 no. 100 76000"
    })
    @Column("text")
    locationAddress: string;

    @ApiProperty({
        default: [12, 12]
    })
    @Column({
        type: "int",
        array: true
    })
    locationLatLng: number[];

    @ApiProperty({
        type: () => Manager
    })
    @OneToOne(() => Manager, {
        eager: true
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager;

    @ApiProperty({
        type: () => Region
    })
    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
