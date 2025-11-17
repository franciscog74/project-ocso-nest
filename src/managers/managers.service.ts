import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    return await this.managerRepository.save(createManagerDto);
  }

  async findAll() {
    return await this.managerRepository.find({
      relations: {
        location: true,
        user: true
      }
    });
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne({
      where: {
        managerId: id
      },
      relations: {
        location: true,
        user: true
      }
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
