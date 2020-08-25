import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { BaseModel } from '../../api/common/base.model';
import { useMongoosePlugins } from '../../api/common/decorators/use-mongoose-plugin.decorator';

export interface CloudinaryImg {
  public_id: string
  secure_url: string,
}

@useMongoosePlugins()
export class ImgProduct extends BaseModel {
    @prop()
    @AutoMap()
    imgBig: CloudinaryImg
}
