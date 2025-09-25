import { Controller, Get, Post, Body, Patch, Param, Delete, applyDecorators } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Region } from './entities/region.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

const exampleRegion = {
  regionId: 123,
  regionName: "Bajío",
  regionStates: ["Guanajuato", "SLP", "Hidalgo", "Querétaro"]
} as Region;

const IdParam = () => applyDecorators(
  ApiParam({
    name: "id",
    example: 123
  }),
  ApiResponse({
    status: 404,
    description: "Región no encontrada"
  })
);

@ApiAuth()
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @ApiResponse({
    status: 201,
    example: exampleRegion
  })
  @Auth()
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @ApiResponse({
    status: 200,
    description: "Arreglo con todas las regiones",
    example: [exampleRegion]
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleRegion
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleRegion
  })
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    description: "Objeto eliminado"
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
