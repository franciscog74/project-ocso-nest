import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
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

    @ManyToOne(() => Provider, (provider) => provider.products)
    provider: Provider;
}
