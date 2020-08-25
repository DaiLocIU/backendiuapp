import { BaseDto } from '../../common/base.model';
import { AutoMap } from 'nestjsx-automapper';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ProductDto extends BaseDto {
  @ApiPropertyOptional({example: 'iphone'})
  @AutoMap()
  name: string;

  @ApiPropertyOptional({example: 19.9})
  @AutoMap()
  price: number;

  @ApiPropertyOptional({example: 4})
  @AutoMap()
  amount: number;
  @ApiProperty()
  @AutoMap(() => ImgProduct)
  imageProduct: ImgProduct;
}
