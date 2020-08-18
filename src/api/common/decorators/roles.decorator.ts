import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../shared/user/user-role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
