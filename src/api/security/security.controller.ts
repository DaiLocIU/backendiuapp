import { Response, Request } from 'express';
import {
  Post, Controller, Res, Body, Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cookie } from '../common/decorators/cookie.decorator';
import { InjectAppConfig } from '../configuration/app.configuration';
import { TokenResultDto } from '../dtos/auth/token-result.dto';
import { LoginOauthParamsDto } from '../dtos/request-params/login-oauth-params.dto';
import { LoginParamsDto } from '../dtos/request-params/login-params.dto';
import { RegisterParamsDto } from '../dtos/request-params/register-params.dto';
import { AppConfig } from '../types/index';
import { SecurityService } from './security.service';
import { ApiOperationId, ApiErrors } from '../common/decorators/swagger.decorator';

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
  async refreshToken(@Cookie('rtok') refreshToken: string, @Res() res: Response): Promise<TokenResultDto> {
    const [tokenResult, newToken] = await this.securityService.refresh(refreshToken);
    res.cookie('rtok', newToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  @Post('register')
  @ApiOperationId({ summary: 'Register new User' })
  async register(@Body() registerParams: RegisterParamsDto) {
    return await this.securityService.register(registerParams);
  }

  @Post('login')
  @ApiOperationId()
  async login(@Body() loginParams: LoginParamsDto, @Req() req: Request): Promise<TokenResultDto> {
    const [tokenResult, refreshToken] = await this.securityService.login(loginParams);
    req.res.cookie('rtok', refreshToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  @Post('loginOauth')
  @ApiOperationId()
  async loginOauth(
    @Body() loginParams: LoginOauthParamsDto,
    @Req() req: Request,
  ): Promise<TokenResultDto> {
    const [tokenResult, refreshToken] = await this.securityService.loginOauth(loginParams);
    req.res.cookie('rtok', refreshToken, {
      httpOnly: true,
      secure: this.appConfig.env !== 'development',
    });
    return tokenResult;
  }

  @Post('logout')
  @ApiOperationId()
  async logout(@Cookie('rtok') refreshToken: string, @Req() req: Request): Promise<void> {
    await this.securityService.revoke(refreshToken, req.res);
    req.res.clearCookie('rtok');
  }
}
