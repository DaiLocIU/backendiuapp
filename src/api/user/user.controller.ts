import { Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../../shared/user/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth} from '@nestjs/swagger';
import { User } from 'src/shared/user/user.model';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthUserDto } from '../dtos/auth/auth-user.dto';
import { ApiController, ApiOperationId } from '../common/decorators/swagger.decorator';

@ApiController('user', User.modelName)
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    @ApiOperationId()
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async me(@CurrentUser() currentUser: AuthUserDto): Promise<User> {
        return await this.userService.findByEmail(currentUser.email);
    }
}
