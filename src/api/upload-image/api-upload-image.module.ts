import { Module } from '@nestjs/common';
import { UploadService } from './upload-image.service'
import { MongooseModule } from '@nestjs/mongoose';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';
import { UploadRepository } from './upload-image.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ImgProduct.modelName, schema: ImgProduct.schema}
        ])
    ],
  providers: [UploadRepository, UploadService],
  exports: [UploadService],
})
export class ApiUploadImageModule {}