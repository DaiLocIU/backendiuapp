import { BaseModel } from '../../api/common/base.model';
import { useMongoosePlugins } from '../../api/common/decorators/use-mongoose-plugin.decorator'
import { prop } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';

@useMongoosePlugins()
export class ImgProduct extends BaseModel {
    @prop({
        required: true
    })
    @AutoMap()
    imgBig: string;

    // @prop()
    // @AutoMap()
    // imgSlide: [string]

    // @prop()
    // @AutoMap()
    // imgManual: [string]
}
