import { LoginParamsDto } from './login-params.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterParamsDto extends LoginParamsDto {
  @ApiProperty({ required: true, minLength: 6 })
  fullName: string;
}
