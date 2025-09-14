import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    createProductDto.productID ||= uuid();
    const product = await this.productRepository.save(createProductDto);
    return product;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const prod = await this.productRepository.findOneBy({
      productID: id
    });
    if (!prod)
      throw new NotFoundException();
    return prod;
  }

 async findByProvider(id: string) {
    const prods = await this.productRepository.findBy({
      provider: {
        providerID: id
      }
    });
    if (!prods.length)
      throw new NotFoundException();
    return prods;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productID: id,
      ...updateProductDto
    });
    if (!productToUpdate)
      throw new NotFoundException();
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    const del = await this.productRepository.delete({
      productID: id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
