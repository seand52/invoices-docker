import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { getConnection } from 'typeorm';
import * as bycript from 'bcryptjs';
import { Users } from './users.entity';
import { UserRespository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository,
  ) {}

  async create(data: UserDto) {
    const salt = await bycript.genSalt();
    const password = await this.hashPassword(data.password, salt);
    return this.userRepository.signUp(
      { username: data.username, password },
      salt,
    );
  }

  private hashPassword(password: string, salt: string): string {
    return bycript.hash(password, salt);
  }

  async validateUserPassword(credentials: UserDto): Promise<boolean> {
    const { username, password } = credentials;
    const user = await this.userRepository.findOne({ username });
    return user && (await user.validatePassword(password));
  }
}
