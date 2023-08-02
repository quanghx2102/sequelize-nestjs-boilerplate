import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../users/entities/user.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { USER_REPOSITORY } from 'src/databases/database.constants';
import { LoginResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginAuthDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (!user || !user.comparePassword(data.password)) {
      throw new BadRequestException('Login failed');
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRED,
    });

    return { accessToken };
  }

  async register(data: RegisterAuthDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (user) {
      throw new BadRequestException('Username already exists');
    }

    await this.userRepository.create({ ...data });

    return user;
  }
}
