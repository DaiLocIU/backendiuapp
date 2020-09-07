import { AnyParamConstructor, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { ConfigType } from '@nestjs/config';
import { webConfiguration } from '../configuration/web.configuration';
import { arenaConfiguration } from '../configuration/arena.configuration';
import { redisConfiguration } from '../configuration/redis.configuration';
import { sendGridConfiguration } from '../configuration/sendgrid.configuration';
import { appConfiguration } from '../configuration/app.configuration';
import { authConfiguration } from '../configuration/auth.configuration';
import { dbConfiguration } from '../configuration/db.configuration';
import { BaseModel } from '../common/base.model';
import { cloudinaryConfiguration } from '../configuration/cloudinary.configuration';

export type ModelType<T extends BaseModel> = ReturnModelType<AnyParamConstructor<T>>;

export type AuthConfig = ConfigType<typeof authConfiguration>;
export type CloudinaryConfig = ConfigType<typeof cloudinaryConfiguration>
export type DbConfig = ConfigType<typeof dbConfiguration>;
export type AppConfig = ConfigType<typeof appConfiguration>;
export type SendGridConfig = ConfigType<typeof sendGridConfiguration>;
export type RedisConfig = ConfigType<typeof redisConfiguration>
export type ArenaConfig = ConfigType<typeof arenaConfiguration>
export type WebConfig = ConfigType<typeof webConfiguration>
