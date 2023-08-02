import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { providerGlobals } from 'src/databases/model.providers';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ...providerGlobals],
})
export class AuthModule {}
