import { ApiProperty } from '@nestjs/swagger'

export class CreateImageProductDto {
    @ApiProperty({ required: true })
    imgBig: string;
}