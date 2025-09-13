import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productID: uuid(),
      productName: "Sabritas Original 50g",
      price: 20,
      sealCount: 1,
      provider: uuid()
    },
    {
      productID: uuid(),
      productName: "Coca Cola 600ml",
      price: 18,
      sealCount: 2,
      provider: uuid()
    },
    {
      productID: uuid(),
      productName: "Agua Ciel 1l",
      price: 15,
      sealCount: 2,
      provider: uuid()
    }
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productID = uuid();
    this.products.push(createProductDto);
    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const index = this.findIndex(id);
    return this.products[index];
  }

  findByProvider(id: string) {
    const prods = this.products.filter((p) => p.provider === id);
    if (!prods.length)
      throw new NotFoundException();
    return prods;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const index = this.findIndex(id);
    for (const key in updateProductDto)
      this.products[index][key] = updateProductDto[key];
    return this.products;
  }

  remove(id: string) {
    const index = this.findIndex(id)
    delete this.products[index];
    return this.products;
  }

  private findIndex(id: string) {
    const index = this.products.findIndex((p) => p.productID === id);
    if (index === -1)
      throw new NotFoundException();
    return index;
  }
}
