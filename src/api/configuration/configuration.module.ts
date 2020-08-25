import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { appConfiguration } from './app.configuration';
import { authConfiguration } from './auth.configuration';
import { dbConfiguration } from './db.configuration';
import { cloudinaryConfiguration } from './cloudinary.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [appConfiguration, authConfiguration, dbConfiguration, cloudinaryConfiguration],
    }),
  ],
})
export class ApiConfigModule {

}
