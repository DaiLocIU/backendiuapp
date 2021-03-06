import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authConfiguration } from '../configuration/auth.configuration';
import { AuthConfig } from '../types/index';
import { ApiUserModule } from '../user/api-user.module';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy.service';
import { PassportGlobalModule } from './passport-global.module';

@Module({
  imports: [
    PassportGlobalModule,
    JwtModule.registerAsync({
      inject: [authConfiguration.KEY],
      useFactory: (authConfig: AuthConfig) => ({
        secret: authConfig.jwtSecret,
        signOptions: {
          expiresIn: authConfig.jwtExpired,
        },
      }),
    }),
    ApiUserModule,
  ],
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService],
})
export class ApiAuthModule {}
