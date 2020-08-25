import { AutoMap } from 'nestjsx-automapper';
import { BaseDto } from '../../common/base.model';

export class UserDto extends BaseDto {
  @AutoMap()
  email: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  fullName: string;

  @AutoMap()
  avatarUrl: string;
}
