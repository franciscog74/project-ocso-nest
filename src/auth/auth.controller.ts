import { Controller, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import type { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';

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
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return token;
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
