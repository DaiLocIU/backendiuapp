import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateImageProductDto {
    @ApiPropertyOptional({ required: false })
    imgBig?: string;
}
