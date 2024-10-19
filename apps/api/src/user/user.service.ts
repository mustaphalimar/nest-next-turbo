import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;

    const hashed_password = await argon.hash(password);

    return await this.prismaService.user.create({
      data: {
        ...user,
        password: hashed_password,
      },
    });
  }

  async findByEmail(email: string) {
    await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
