import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '@/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';
import { LocalStrategy } from './strategies/local.startegy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, LocalStrategy],
})
export class AuthModule {}
