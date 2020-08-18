import { BaseDto } from '../../common/base.model';
import { AutoMap } from 'nestjsx-automapper';


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
