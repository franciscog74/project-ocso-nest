import { Injectable, InternalServerErrorException, NotFoundException, StreamableFile } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { createReadStream, unlink } from 'fs';
import { extname, join } from 'path';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.employeeId ||= uuid();
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  async uploadPhoto(id: string, filename: string) {
    const { employeePhoto } = await this.findOne(id);
    if (employeePhoto) {
      unlink(`./src/employees/employee-photos/${employeePhoto}`, (err) => {
        if (err)
          throw new InternalServerErrorException();
      });
    }
    return await this.update(id, {
      employeePhoto: filename
    });
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id
    });
    if (!employee)
      throw new NotFoundException();
    return employee;
  }

  async getPhoto(id: string) {
    const { employeePhoto } = await this.findOne(id);
    if (!employeePhoto)
      throw new NotFoundException();
    else return new StreamableFile(
      createReadStream(
        join(process.cwd(), `/src/employees/employee-photos/${employeePhoto}`)
      ),
      {
        type: (extname(employeePhoto) === ".png") ? "image/png" : "image/jpeg",
        disposition: `attachment; filename="${employeePhoto}"`
      }
    );
  }

  async findByLocation(id: number) {
    const employees = await this.employeeRepository.findBy({
      location: {
        locationId: id
      }
    });
    if (!employees.length)
      throw new NotFoundException();
    return employees;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
    if (!employeeToUpdate)
      throw new NotFoundException();
    await this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  async remove(id: string) {
    const del = await this.employeeRepository.delete({
      employeeId: id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
