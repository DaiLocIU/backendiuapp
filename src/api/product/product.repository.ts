import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../common/base.repository';
import { ModelType } from '../types';
import { Product } from 'src/shared/product/product.model';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(@InjectModel(Product.modelName) private readonly productModel: ModelType<Product>) {
        super(productModel);
    }
    
    
    async createProduct({name,price,amount,imageProduct}:any): Promise<Product> {
        const newProduct = this.createModel({name, price, amount, imageProduct});
        console.log('newProduct ' + newProduct)
        try {
          const result = await this.create(newProduct);
          console.log('result ' + result)
          return result.toJSON() as Product;
    } catch (e) {
          throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

}
