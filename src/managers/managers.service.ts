import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    createManagerDto.managerId ||= uuid();
    return await this.managerRepository.save(createManagerDto);
  }

  async findAll() {
    return await this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOneBy({
      managerId: id
    });
    if (!manager)
      throw new NotFoundException();
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
        const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    });
    if (!managerToUpdate)
      throw new NotFoundException();
    await this.managerRepository.save(managerToUpdate);
    return managerToUpdate;
  }

  async remove(id: string) {
    const del = await this.managerRepository.delete({
      managerId: id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
