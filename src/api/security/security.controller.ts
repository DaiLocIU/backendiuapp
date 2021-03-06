import { Response, Request } from 'express';
import {
  Post, Controller, Res, Body, Req, Param, Put,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from 'src/shared/user/user.model';
import { ChangePassword } from '../dtos/request-params/change-password.dto';
import { RequestResetPassword } from '../dtos/request-params/request-reset-password.dto';
import { Cookie } from '../common/decorators/cookie.decorator';
import { InjectAppConfig } from '../configuration/app.configuration';
import { TokenResultDto } from '../dtos/auth/token-result.dto';
import { LoginOauthParamsDto } from '../dtos/request-params/login-oauth-params.dto';
import { LoginParamsDto } from '../dtos/request-params/login-params.dto';
import { RegisterParamsDto } from '../dtos/request-params/register-params.dto';
import { AppConfig } from '../types/index';
import { SecurityService } from './security.service';
import { ApiOperationId, ApiErrors } from '../common/decorators/swagger.decorator';
import { VerifyRegistrationParamsVm } from '../dtos/request-params/verify-registration-params.dto';

@Controller('auth')
@ApiTags('Security')
@ApiErrors()
export class SecurityController {
  constructor(
    private readonly securityService: SecurityService,
    @InjectAppConfig() private readonly appConfig: AppConfig,
  ) {}

  @Post('refreshToken')
  @ApiOperationId()
  @ApiCreatedResponse({
    type: TokenResultDto,
    headers: {
      'Set-Cookie': {
        description: 'Refresh Token',
        schema: { type: 'string' },
      },
    },
  })
  async refreshToken(@Cookie('rtok') refreshToken: string, @Res() res: Response): Promise<TokenResultDto> {
    const [tokenResult, newToken] = await this.securityService.refresh(refreshToken);
    res.cookie('rtok', newToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  @Post('register')
  @ApiOkResponse({ type: User })
  @ApiOperationId({ summary: 'Register new User' })
  async register(@Body() registerParams: RegisterParamsDto): Promise<User> {
    return await this.securityService.register(registerParams);
  }

  @Put('verify')
  @ApiOkResponse({ type: User })
  @ApiOperationId()
  async verify(
    @Body() verifyParams: VerifyRegistrationParamsVm,
  ): Promise<User> {
    return await this.securityService.verify(verifyParams.token);
  }

  @Post('login')
  @ApiCreatedResponse({
    type: TokenResultDto,
    headers: {
      'Set-Cookie': {
        description: 'Login',
        schema: { type: 'string' },
      },
    },
  })
  @ApiOperationId()
  async login(@Body() loginParams: LoginParamsDto, @Req() req: Request): Promise<TokenResultDto> {
    const [tokenResult, refreshToken] = await this.securityService.login(loginParams);
    req.res.cookie('rtok', refreshToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  // @Post('loginOauth')
  // @ApiOperationId()
  // async loginOauth(
  //   @Body() loginParams: LoginOauthParamsDto,
  //   @Req() req: Request,
  // ): Promise<TokenResultDto> {
  //   const [tokenResult, refreshToken] = await this.securityService.loginOauth(loginParams);
  //   req.res.cookie('rtok', refreshToken, {
  //     httpOnly: true,
  //     secure: this.appConfig.env !== 'development',
  //   });
  //   return tokenResult;
  // }

  @Post('logout')
  @ApiOperationId()
  async logout(@Cookie('rtok') refreshToken: string, @Req() req: Request): Promise<void> {
    await this.securityService.revoke(refreshToken, req.res);
    req.res.clearCookie('rtok');
  }

  @Post('requestResetPassword')
  @ApiOperationId()
  async requestResetPassword(@Body() body: RequestResetPassword): Promise<string> {
    const resetPasswordToken = await this.securityService.resquetResetPassword(body.email);
    return resetPasswordToken;
  }

  @Post('resetPassword/:token')
  @ApiOperationId()
  async resetPassword(@Param('token') token:string, @Body() body:ChangePassword): Promise<User> {
    console.log(token);
    return await this.securityService.resetPassword(token, body.newPassword);
  }
}
