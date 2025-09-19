import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ) {}
  async create(createRegionDto: CreateRegionDto) {
    return await this.regionRepository.save(createRegionDto);
  }

  async findAll() {
    return await this.regionRepository.find();
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findOneBy({
      regionId: id
    });
    if (!region)
      throw new NotFoundException();
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto
    });
    if (!regionToUpdate)
      throw new NotFoundException();
    await this.regionRepository.save(regionToUpdate);
    return regionToUpdate;
  }

  async remove(id: number) {
    const del = await this.regionRepository.delete({
      regionId: id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
