import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productID: string;

    @Column({ type: "text" })
    productName: string;

    @Column({ type: "float" })
    price: number;

    @Column({ type: "int" })
    sealCount: number;

    @Column({ type: "uuid" })
    provider: string;
}
