import { Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { BaseService } from '../common/base.service';
import { User } from '../../shared/user/user.model';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findById(id).exec();
  }

  async updateRefreshTokenId(id: string) {
    await this.userRepository.updateRefreshTokenId(id);
  }

  async changePassword(id: string, newPassword: string): Promise<User> {
    return this.userRepository.changePassword(id, newPassword);
  }
}
