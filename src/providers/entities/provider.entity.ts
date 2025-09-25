import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Product } from "src/products/entities/product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn("uuid")
    providerID: string;

    @ApiProperty({
        default: "FEMSA"
    })
    @Column("text")
    providerName: string;

    @ApiProperty({
        default: "correo@coca.com"
    })
    @Column({
        type: "text",
        unique: true
    })
    providerEmail: string;

    
    @ApiPropertyOptional({
        default: "0123456789"
    })
    @Column({
        type: "text",
        nullable: true
    })
    providerPhone: string;

    @OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}
