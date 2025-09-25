import { ApiProperty } from "@nestjs/swagger";
import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn("increment")
    regionId: number;

    @ApiProperty({
        default: "Bajío"
    })
    @Column({
        type: "text",
        unique: true
    })
    regionName: string;

    @ApiProperty({
        default: ["Guanajuato", "SLP", "Hidalgo", "Querétaro"]
    })
    @Column({
        type: "text",
        array: true
    })
    regionStates: string[]

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[];
}
