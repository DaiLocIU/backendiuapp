import { ApiPropertyOptional } from '@nestjs/swagger';
import { CloudinaryImg } from '../../../shared/imgProduct/imgProduct.model';

export class CreateImageProductDto {
    @ApiPropertyOptional({ required: false })
    imgBig?: CloudinaryImg
}
