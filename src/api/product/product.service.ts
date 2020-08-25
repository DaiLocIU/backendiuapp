import { Injectable } from '@nestjs/common'
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { BaseService } from '../common/base.service';
import { Product } from 'src/shared/product/product.model';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dtos/request-params/create-product.dto';
import { ImageService } from '../image/image.service';
import { Types } from 'mongoose';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';



@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly imageService: ImageService,
        @InjectMapper() private readonly mapper: AutoMapper
    ) {
        super(productRepository)
    }

    async createProduct({ name, price, amount, file}: CreateProductDto): Promise<Product> {
        // Create Image Product
        const imageDb = await this.imageService.createImg(file)
        const paramsProduct = {
            name,
            price,
            amount,
            imageProduct:Types.ObjectId(imageDb.id)
        }
        return this.productRepository.createProduct(paramsProduct)
    }

    async getProductById(id: string):Promise<Product> {
        return this.productRepository.getProductById(id)
    }

    async getImgByProductId(id:string):Promise<ImgProduct> {
        const product = await this.getProductById(id) as any
        return this.imageService.findImgById(product.imageProduct.id)
    }   
      
}
