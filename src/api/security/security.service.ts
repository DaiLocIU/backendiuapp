import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { Response } from 'express';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { verify } from 'jsonwebtoken';
import { EmailTemplate } from '../email/email.template-enum';
import { EmailService } from '../email/email.service';
import { AuthService } from '../auth/auth.service';
import { TokenResultDto } from '../dtos/auth/token-result.dto';
import { LoginOauthParamsDto } from '../dtos/request-params/login-oauth-params.dto';
import { LoginParamsDto } from '../dtos/request-params/login-params.dto';
import { RegisterParamsDto } from '../dtos/request-params/register-params.dto';
import { UserService } from '../user/user.service';
import { User } from '../../shared/user/user.model';
import { parseFullName } from '../../shared/utils';

@Injectable()
export class SecurityService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    @InjectMapper() private readonly mapper: AutoMapper,
  ) {}

  async register({ email, fullName, password }: RegisterParamsDto) {
    const user = await this.userService.findByEmail(email);
    if (user != null) {
      throw new BadRequestException(email, 'Email already exists');
    }

    const [firstName, lastName] = parseFullName(fullName);

    const newUser = this.userService.createModel({
      email, firstName, lastName, password,
    });
    try {
      const result = await this.userService.create(newUser);
      return result.toJSON() as User;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login({ password, email }: LoginParamsDto): Promise<[TokenResultDto, string]> {
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new BadRequestException(email, 'Wrong credentials');
    }

    if (user.oauthId != null) {
      throw new BadRequestException(password, 'OAuth User');
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      throw new NotFoundException(password, 'Wrong credentials');
    }

    return await this.getTokens(user);
  }

  async loginOauth(
    { email, oauthId, providerId }: LoginOauthParamsDto,
  ): Promise<[TokenResultDto, string]> {
    const user = await this.userService.findByEmail(email);
    if (user == null) {
      throw new BadRequestException(email, 'Wrong credentials');
    }

    if (user.oauthId == null) {
      throw new BadRequestException(email, 'Invalid OAuth User');
    }

    if (user.oauthId === oauthId && user.providerUid === providerId) {
      return await this.getTokens(user);
    }

    throw new BadRequestException(oauthId, 'OAuth ID does not match');
  }

  async refresh(refreshToken: string): Promise<[TokenResultDto, string]> {
    if (refreshToken == null) {
      throw new UnauthorizedException(refreshToken, 'No refresh token');
    }

    const { id, tokenId } = await this.authService.verifyRefreshToken(refreshToken).catch((e) => {
      throw new UnauthorizedException(e, 'Error verifying refresh token');
    });

    const user = await this.userService.getUserById(id);
    if (user == null) {
      throw new UnauthorizedException(id, 'User not found');
    }

    if (user.refreshTokenId !== tokenId) {
      throw new UnauthorizedException(tokenId, 'Invalid refresh token');
    }

    return await this.getTokens(user);
  }

  async revoke(refreshToken: string, res: Response): Promise<void> {
    if (refreshToken == null) {
      res.clearCookie('rtok');
      Logger.log('authenticatedGuard runs logout', 'SecurityService');
      return;
    }

    const { id } = await this.authService.verifyRefreshToken(refreshToken).catch((e) => {
      res.clearCookie('rtok');
      throw new UnauthorizedException(e, 'Error verifying refresh token');
    });

    const user = await this.userService.getUserById(id);
    if (user == null) {
      res.clearCookie('rtok');
      throw new UnauthorizedException(id, 'User not found');
    }

    await this.userService.updateRefreshTokenId(id);
  }

  private async getTokens(user: User): Promise<[TokenResultDto, string]> {
    const [accessTokenResult, refreshToken]: [TokenResultDto, string] = await Promise.all([
      this.authService.createAccessToken(user.email),
      this.authService.createRefreshToken(user.id, user.refreshTokenId),
    ]);
    return [accessTokenResult, refreshToken];
  }

  async resquetResetPassword(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(email, 'User not found');
    }
    const resetPasswordToken = await this.authService.createResetPasswordToken(email);
    await this.emailService.sendByTemplate(
      EmailTemplate.ResetPassword,
      {
        to: email,
        from: '',
        templateId: EmailTemplate.ResetPassword,
        dynamicTemplateData: {
          token: resetPasswordToken,
        },
      },
    );
    return resetPasswordToken;
  }

  async resetPassword(token: string, newPassword:string): Promise<User> {
    const tokenResult = await this.authService.verifyResetPasswordToken(token);
    const user = await this.userService.findByEmail(tokenResult.email);
    return await this.userService.changePassword(user.id, newPassword);
  }
}
