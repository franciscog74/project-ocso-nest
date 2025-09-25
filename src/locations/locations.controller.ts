import { Controller, Get, Post, Body, Patch, Param, Delete, applyDecorators } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { Location } from './entities/location.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

const exampleLocation = {
  locationId: 123,
  locationName: "Ocso Juriquilla",
  locationAddress: "Calle 1 no. 100 76000",
  locationLatLng: [12, 12]
} as Location;

const IdParam = () => applyDecorators(
  ApiParam({
    name: "id",
    example: 123
  }),
  ApiResponse({
    status: 404,
    description: "Ubicación no encontrada"
  })
);

@ApiAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiResponse({
    status: 201,
    example: exampleLocation
  })
  @Auth()
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @ApiResponse({
    status: 200,
    description: "Arreglo con todas las ubicaciones",
    example: [exampleLocation]
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleLocation
  })
  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    example: exampleLocation
  })
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @IdParam()
  @ApiResponse({
    status: 200,
    description: "Objeto eliminado"
  })
  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
