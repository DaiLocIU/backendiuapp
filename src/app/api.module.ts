import { Module } from '@nestjs/common';
import { ApiSecurityModule } from 'src/api/security/api-security.module';
import { ApiUserModule } from 'src/api/user/api-user.module';
import { ApiImageModule } from 'src/api/image/api-image.module';
import { ApiProductModule } from 'src/api/product/api-product.module';

export const apiModules = [
  ApiUserModule,
  ApiSecurityModule,
  ApiImageModule,
  ApiProductModule,
];

@Module({
  imports: [...apiModules],
})
export class ApiModule {}
