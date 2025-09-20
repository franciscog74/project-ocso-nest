import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return await this.userRepository.save(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: loginUserDto.userEmail
    });

    if (!user)
      throw new NotFoundException();

    const match = bcrypt.compare(loginUserDto.userPassword, user.userPassword);
    if (!match)
      throw new UnauthorizedException();

    const payload = {
      user: user.userEmail,
      password: user.userPassword
    }
    const token = this.jwtService.sign(payload);
    return token;
  }
}
