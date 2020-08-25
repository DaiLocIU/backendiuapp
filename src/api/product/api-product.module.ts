import { Module } from '@nestjs/common';
import { ProductService } from './product.service'
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from './product.repository';
import { Product } from 'src/shared/product/product.model';
import { ApiImageModule } from '../image/api-image.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Product.modelName, schema: Product.schema}
        ]),
        ApiImageModule
    ],
    controllers:[ProductController],
  providers: [ProductRepository, ProductService],
  exports: [ProductService],
})
export class ApiProductModule {}