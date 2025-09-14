import { Product } from "src/products/entities/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn("uuid")
    providerID: string;

    @Column("text")
    providerName: string;

    @Column("text")
    providerEmail: string;

    @Column({
        type: "text",
        nullable: true
    })
    providerPhone: string;

    @OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}
