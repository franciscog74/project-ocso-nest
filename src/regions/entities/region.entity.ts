import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn("increment")
    regionId: number;

    @Column({
        type: "text",
        unique: true
    })
    regionName: string;

    @Column({
        type: "text",
        array: true
    })
    regionStates: string[]

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[];
}
