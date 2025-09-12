import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';

@Injectable()
export class EmployeesService {
  private readonly employees: CreateEmployeeDto[] = [
  {
    id: 1,
    name: "Alberto",
    lastName: "Casas",
    phone: "74927283"
  },{
    id: 2,
    name: "José",
    lastName: "Pérez",
    phone: "99379938"
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.find((e) => e.id === id);
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const index = this.employees.findIndex((e) => e.id === id);
    const e = this.employees[index];
    this.employees[index] = {
      ...e,
      ...updateEmployeeDto
    };
    return this.employees;
  }

  remove(id: number) {
    const index = this.employees.findIndex((e) => e.id === id);
    delete this.employees[index];
    return this.employees;
  }
}
