import { Controller, Get, Post, Body, Patch, Param, Delete, applyDecorators } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Manager } from './entities/manager.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

const exampleManager = {
  managerId: "UUID",
  managerFullName: "Sergio Marquez",
  managerEmail: "correo@ejemplo.com",
  managerPhone: "1234567890",
  managerSalary: 15000
} as Manager;

const IdParam = () => applyDecorators(
  ApiParam({
    name: "id",
    example: "UUID"
  }),
  ApiResponse({
    status: 404,
    description: "Gerente no encontrado"
  })
);

@ApiAuth()
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @ApiResponse({
    status: 201,
    example: exampleManager
  })
  @Auth()
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @ApiResponse({
    status: 200,
    description: "Arreglo con todos los gerentes",
    example: [exampleManager]
  })
  @Auth()
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleManager
  })
  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleManager
  })
  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    description: "Objeto eliminado"
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
