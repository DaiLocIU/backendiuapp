import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { BaseModel } from '../../api/common/base.model';
import { useMongoosePlugins } from '../../api/common/decorators/use-mongoose-plugin.decorator';

@useMongoosePlugins()
export class ImgProduct extends BaseModel {
    @prop()
    @AutoMap()
    imgBig?: string;

  // @prop()
  // @AutoMap()
  // imgSlide: [string]

  // @prop()
  // @AutoMap()
  // imgManual: [string]
}
