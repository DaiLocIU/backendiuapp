import {
  Get, UseGuards, Patch, Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/shared/user/user.model';
import { ChangePassword } from '../dtos/request-params/change-password.dto';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../../shared/user/user-role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthUserDto } from '../dtos/auth/auth-user.dto';
import { ApiController, ApiOperationId } from '../common/decorators/swagger.decorator';

@ApiController('user', User.modelName)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

    @Get()
    @ApiOperationId({ summary: 'user is logged in' })
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
  async me(@CurrentUser() currentUser: AuthUserDto): Promise<User> {
    return await this.userService.findByEmail(currentUser.email);
  }

  @Patch()
  @ApiOperationId({ summary: 'change password' })
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
    async changePassword(
      @CurrentUser() currentUser: AuthUserDto,
      @Body() body: ChangePassword,
    ):Promise<User> {
      return await this.userService.changePassword(currentUser.id, body.newPassword);
    }
}
