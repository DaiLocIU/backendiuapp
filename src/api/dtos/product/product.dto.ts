import { BaseDto } from '../../common/base.model';
import { AutoMap } from 'nestjsx-automapper';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';

export class ProductDto extends BaseDto {

  @AutoMap()
  name: string;

  @AutoMap()
  price: number;

  @AutoMap()
  amount: number;
 
  @AutoMap(() => ImgProduct)
  imageProduct: ImgProduct;
}
