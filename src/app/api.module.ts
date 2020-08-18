import { Module } from '@nestjs/common';
import { ApiSecurityModule } from '../api/security/api-security.module';
import { ApiUserModule } from '../api/user/api-user.module';
import { ApiUploadImageModule } from 'src/api/upload-image/api-aws.module';

export const apiModules = [
  ApiUserModule,
  ApiSecurityModule,
  ApiUploadImageModule
];

@Module({
  imports: [...apiModules],
})
export class ApiModule {}
