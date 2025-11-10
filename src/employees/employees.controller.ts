import {
  Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe,
  UploadedFile, applyDecorators,
  ParseFilePipe,
  MaxFileSizeValidator
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { FileInterceptorDecorator } from './decorators/file.decorator';

const exampleEmployee = {
  employeeId: "UUID",
  employeeName: "Karlo",
  employeeLastName: "Paz",
  employeeEmail: "karlo@example.com",
  employeePhone: "1234567890",
  employeePhoto: "URL"
} as Employee;

const IdParam = () => applyDecorators(
  ApiParam({
    name: "id",
    example: "UUID"
  }),
  ApiResponse({
    status: 404,
    description: "Empleado no encontrado"
  })
);

@ApiAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @ApiResponse({
    status: 201,
    example: exampleEmployee
  })
  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiResponse({
    status: 201,
    description: "La fotografía se subió correctamente"
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post(":id/upload")
  @FileInterceptorDecorator
  uploadPhoto(
    @Param('id', new ParseUUIDPipe({ version: "4" })) id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.employeesService.update(id, {
      employeePhoto: file.filename
    });
  }

  @ApiResponse({
    status: 200,
    description: "Arreglo con todos los empleados en la base de datos",
    example: [exampleEmployee]
  })
  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleEmployee
  })
  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.findOne(id);
  }

  @ApiParam({
    name: "id",
    example: "123"
  })
  @ApiResponse({
    status: 200,
    description: "Arreglo con todos los empleados de dicha ubicación",
    example: [exampleEmployee]
  })
  @ApiResponse({
    status: 404,
    description: "Ubicación no encontrada o sin empleados"
  })
  @Auth(ROLES.MANAGER)
  @Get('location/:id')
  findByLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleEmployee
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    description: "Objeto eliminado"
  })
  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.employeesService.remove(id);
  }
}
