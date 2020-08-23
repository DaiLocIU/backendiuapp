import { BaseModel } from '../../api/common/base.model';
import { useMongoosePlugins } from '../../api/common/decorators/use-mongoose-plugin.decorator'
import { prop, Ref } from '@typegoose/typegoose';
import { AutoMap } from 'nestjsx-automapper';
import { ImgProduct } from '../imgProduct/imgProduct.model'

@useMongoosePlugins()
export class Product extends BaseModel {
  @prop({
    required: true,
    unique: true,
    maxlength: 100,
    index: true,
  })
  @AutoMap()
  name: string;

  @prop({
      required: true,
      float: true,
  })
  @AutoMap()
  price: number;

  @prop({
      required: true,
      min: 0
  })
  @AutoMap()
  amount: number;

  @prop({ ref: ImgProduct, autopopulate: true, default: null })
  @AutoMap(() => ImgProduct)
  imageProduct: Ref<ImgProduct>;
}
