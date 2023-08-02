import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { Response } from 'express';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationParams } from 'src/utils/paginationParams';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  getProfile(@Req() req): Promise<any> {
    const { id } = req.user;

    return this.usersService.findOne({ id }, { exclude: ['password'] });
  }

  @Get()
  async getUsers(
    @Req() req,
    @Res() res: Response,
    @Query() query: PaginationParams,
  ): Promise<Response> {
    const { id } = req.user;
    const { page, limit } = query;

    const users = await this.usersService.findAllUsers(
      {
        id: {
          [Op.not]: id,
        },
      },
      { exclude: ['password'] },
      page,
      limit,
    );

    return res.json({
      message: 'Get users successfully',
      payload: { data: users },
    });
  }

  @Put('/edit')
  async updateProfile(
    @Req() req,
    @Res() res,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Response> {
    const { id } = req.user;

    await this.usersService.update(updateUserDto, id);

    return res.json({
      message: 'OKE',
    });
  }
}
