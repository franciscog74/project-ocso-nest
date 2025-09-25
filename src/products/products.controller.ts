import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, applyDecorators } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Product } from './entities/product.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

const exampleProduct = {
  productID: "UUID",
  productName: "Coca Cola 3l",
  price: 20,
  sealCount: 1
} as Product;

const IdParam = () => applyDecorators(
  ApiParam({
    name: "id",
    example: "UUID"
  }),
  ApiResponse({
    status: 404,
    description: "Producto no encontrado"
  })
);

@ApiAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    example: exampleProduct
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({
    status: 200,
    description: "Arreglo con todos los productos",
    example: [exampleProduct]
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleProduct
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.productsService.findOne(id);
  }
  
  @ApiParam({
    name: "id",
    example: "UUID"
  })
  @ApiResponse({
    status: 200,
    example: exampleProduct
  })
  @ApiResponse({
    status: 404,
    description: "Proveedor no encontrado o sin productos"
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('provider/:id')
  findByProvider(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.productsService.findByProvider(id);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleProduct
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    description: "Objeto eliminado"
  })
  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.productsService.remove(id);
  }
}
