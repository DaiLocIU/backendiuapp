import { BaseDto } from '../../common/base.model';
import { AutoMap } from 'nestjsx-automapper';
import { UserRole } from 'src/shared/user/user-role.enum';


export class AuthUserDto extends BaseDto {
  @AutoMap()
  readonly email: string;
  @AutoMap()
  role?: UserRole;
}
