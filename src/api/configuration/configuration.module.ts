import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { arenaConfiguration } from './arena.configuration';
import { sendGridConfiguration } from './sendgrid.configuration';
import { appConfiguration } from './app.configuration';
import { authConfiguration } from './auth.configuration';
import { dbConfiguration } from './db.configuration';
import { cloudinaryConfiguration } from './cloudinary.configuration';
import { redisConfiguration } from './redis.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [
        appConfiguration,
        authConfiguration,
        dbConfiguration,
        cloudinaryConfiguration,
        sendGridConfiguration,
        redisConfiguration,
        arenaConfiguration,
      ],
    }),
  ],
})
export class ApiConfigModule {

}
