import { Module } from '@nestjs/common';
import { ProductService } from './product.service'
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from './product.repository';
import { Product } from 'src/shared/product/product.model';
import { ApiUploadImageModule } from '../upload-image/api-upload-image.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Product.modelName, schema: Product.schema}
        ]),
        ApiUploadImageModule
    ],
    controllers:[ProductController],
  providers: [ProductRepository, ProductService],
  exports: [ProductService],
})
export class ApiProductModule {}