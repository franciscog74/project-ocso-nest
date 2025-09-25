import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

const exampleUser = {
  userId: "UUID",
  userEmail: "correo@ejemplo.com",
  userPassword: "Contraseña con hashing",
  userRoles: ["Employee", "Manager"]
} as User;

@ApiResponse({
  status: 500,
  description: "Server error"
})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    example: exampleUser
  })
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiResponse({
    status: 201,
    example: "JWT"
  })
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @ApiParam({
    name: "email",
    example: "correo@ejemplo.com"
  })
  @ApiResponse({
    status: 200,
    example: exampleUser
  })
  @Patch('/:email')
  update(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto);
  }
}
