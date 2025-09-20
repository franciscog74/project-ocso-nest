import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    const provider = await this.providerRepository.save(createProviderDto);
    return provider;
  }

  async findAll() {
    return await this.providerRepository.find();
  }

  async findByName(name: string) {
    const provider = await this.providerRepository.findOneBy({
      providerName: Like(`%${name}%`)
    });
    if (!provider)
      throw new NotFoundException();
    return provider;
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({
      providerID: id
    });
    if (!provider)
      throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload({
      providerID: id,
      ...updateProviderDto,
    });
    if (!providerToUpdate)
      throw new NotFoundException();
    return this.providerRepository.save(providerToUpdate);
  }

  async remove(id: string) {
    const del = await this.providerRepository.delete({
      providerID: id
    });
    if (!del.affected)
      throw new NotFoundException();
    return {
      message: `Objeto con id ${id} eliminado`
    };
  }
}
