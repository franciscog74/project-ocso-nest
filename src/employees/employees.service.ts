import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  private readonly employees: CreateEmployeeDto[] = [];

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id ||= uuid();
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      id
    });
    if (!employee)
      throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto
    });
    if (!employeeToUpdate)
      throw new NotFoundException();
    await this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  async remove(id: string) {
    const del = await this.employeeRepository.delete({
      id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
