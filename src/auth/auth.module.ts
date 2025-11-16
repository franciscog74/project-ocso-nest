import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from './constants/jwt.constants';
import { Manager } from 'src/managers/entities/manager.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { ManagersModule } from 'src/managers/managers.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Manager, Employee]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN
      },
      global: true
    }),
    ManagersModule, EmployeesModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
