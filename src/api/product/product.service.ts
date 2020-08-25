import { Injectable } from '@nestjs/common';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { Product } from 'src/shared/product/product.model';
import { Types } from 'mongoose';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';
import { BaseService } from '../common/base.service';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dtos/request-params/create-product.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
        private readonly productRepository: ProductRepository,
        private readonly imageService: ImageService,
        @InjectMapper() private readonly mapper: AutoMapper,
  ) {
    super(productRepository);
  }

  async createProduct({
    name, price, amount, file,
  }: CreateProductDto): Promise<Product> {
    // Create Image Product
    const imageDb = await this.imageService.createImg(file);
    const imageProduct = Types.ObjectId(imageDb.id);

    const paramsProduct = {
      name,
      price,
      amount,
      imageProduct,
    };
    return this.productRepository.createProduct(paramsProduct);
  }

  async getProductById(id: string):Promise<Product> {
    return this.productRepository.getProductById(id);
  }

  async getImgByProductId(id:string):Promise<ImgProduct> {
    const product = await this.getProductById(id) as any;
    return this.imageService.findImgById(product.imageProduct.id);
  }
}
