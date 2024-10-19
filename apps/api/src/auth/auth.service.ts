import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(createUserDto: CreateUserDto) {
    const user = this.userService.findByEmail(createUserDto.email);

    if (user) throw new ConflictException('Email already in use!');
    return this.userService.create(createUserDto);
  }
}
