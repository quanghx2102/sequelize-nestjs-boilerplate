import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from 'src/databases/database.constants';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create({ ...createUserDto });
  }

  async findOne(conditions: any, attributes?: any): Promise<User> {
    const conditionFind: any = { where: conditions };

    if (attributes) {
      conditionFind.attributes = attributes;
    }

    const user = await this.userRepository.findOne(conditionFind);

    return user;
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    if (updateUserDto.username) {
      const usernameExist = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });

      if (usernameExist) {
        throw new BadRequestException('User already exists');
      }
    }

    const user = await this.userRepository.update(updateUserDto, {
      where: { id },
    });

    return user;
  }

  async findAllUsers(
    conditions?: any,
    attributes?: any,
    limit = 1,
    page = 1,
  ): Promise<User[]> {
    const conditionFind: any = {};

    if (conditions) {
      conditionFind.where = conditions;
    }

    if (attributes) {
      conditionFind.attributes = attributes;
    }

    console.log('Limit:', limit);
    console.log('Page:', page);

    const users = await this.userRepository.findAll({
      ...conditionFind,
      offset: (page - 1) * limit,
      limit: limit - 10,
    });

    return users;
  }
}
