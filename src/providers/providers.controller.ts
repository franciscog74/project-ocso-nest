import { Controller, Get, Post, Body, Patch, Param, Delete, applyDecorators } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Provider } from './entities/provider.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

const exampleProvider = {
  providerID: "UUID",
  providerName: "FEMSA",
  providerEmail: "correo@ejemplo.com",
  providerPhone: "0123456789"
} as Provider;

const IdParam = () => applyDecorators(
  ApiParam({
    name: "id",
    example: "UUID"
  }),
  ApiResponse({
    status: 404,
    description: "Proveedor no encontrado"
  })
);

@ApiAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiResponse({
    status: 201,
    example: exampleProvider
  })
  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @ApiResponse({
    status: 200,
    description: "Arreglo con todos los proveedores",
    example: [exampleProvider]
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @ApiParam({
    name: "name",
    example: "FEMSA"
  })
  @ApiResponse({
    status: 200,
    example: exampleProvider
  })
  @ApiResponse({
    status: 404,
    description: "Proveedor no encontrado"
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.providersService.findByName(name);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleProvider
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleProvider
  })
  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    description: "Objeto eliminado"
  })
  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
