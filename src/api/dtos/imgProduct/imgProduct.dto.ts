import { BaseDto } from '../../common/base.model';
import { AutoMap } from 'nestjsx-automapper';


export class ImgProductDto extends BaseDto {

  @AutoMap()
  imgBig: string
}
