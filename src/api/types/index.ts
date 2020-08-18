import { ConfigType } from '@nestjs/config';
import { appConfiguration } from '../configuration/app.configuration';
import { authConfiguration } from '../configuration/auth.configuration';
import { dbConfiguration } from '../configuration/db.configuration';
import { AnyParamConstructor, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { BaseModel } from '../common/base.model';
import { cloudinaryConfiguration } from '../configuration/cloudinary.configuration';


export type ModelType<T extends BaseModel> = ReturnModelType<AnyParamConstructor<T>>;

export type AuthConfig = ConfigType<typeof authConfiguration>;
export type CloudinaryConfig = ConfigType<typeof cloudinaryConfiguration>
export type DbConfig = ConfigType<typeof dbConfiguration>;
export type AppConfig = ConfigType<typeof appConfiguration>;

