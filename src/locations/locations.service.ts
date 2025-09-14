import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    private locationRepository: Repository<Location>
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    return await this.locationRepository.save(createLocationDto);
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id
    });
    if (!location)
      throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    });
    if (!locationToUpdate)
      throw new NotFoundException();
    await this.locationRepository.save(locationToUpdate);
    return locationToUpdate;
  }

  async remove(id: number) {
    const del = await this.locationRepository.delete({
      locationId: id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
