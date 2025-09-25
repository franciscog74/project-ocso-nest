import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Provider } from "src/providers/entities/provider.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productID: string;

    @ApiProperty({
        default: "Coca Cola 3l"
    })
    @Column({ type: "text" })
    productName: string;

    @ApiProperty({
        default: 20
    })
    @Column({ type: "float" })
    price: number;

    @ApiProperty({
        default: 1
    })
    @Column({ type: "int" })
    sealCount: number;

    @ApiPropertyOptional({
        type: () => Provider
    })
    @ManyToOne(() => Provider, (provider) => provider.products)
    @JoinColumn({
        name: "providerId"
    })
    provider: Provider;
}
