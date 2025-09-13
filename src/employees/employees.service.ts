import { Injectable, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeesService {
  private readonly employees: CreateEmployeeDto[] = [
  {
    id: uuid(),
    name: "Alberto",
    lastName: "Casas",
    phone: "74927283"
  },{
    id: uuid(),
    name: "José",
    lastName: "Pérez",
    phone: "99379938"
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find((e) => e.id === id);
    if (!employee)
      throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    this.findOne(id);
    const index = this.employees.findIndex((e) => e.id === id);
    const e = this.employees[index];
    this.employees[index] = {
      ...e,
      ...updateEmployeeDto
    };
    return this.employees;
  }

  remove(id: string) {
    this.findOne(id);
    const index = this.employees.findIndex((e) => e.id === id);
    delete this.employees[index];
    return this.employees;
  }
}
