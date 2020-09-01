import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { BaseModel } from '../../api/common/base.model';
import { useMongoosePlugin } from '../../api/common/decorators/use-mongoose-plugin.decorator';

@useMongoosePlugin()
export class ImgProduct extends BaseModel {
    @prop()
    @AutoMap()
    imgBig: CloudinaryImg
}

export interface CloudinaryImg {
  public_id: string
  secure_url: string,
}
