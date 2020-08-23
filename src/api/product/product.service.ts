import { Injectable } from '@nestjs/common'
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { BaseService } from '../common/base.service';
import { Product } from 'src/shared/product/product.model';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from '../dtos/request-params/create-product.dto';
import { UploadService } from '../upload-image/upload-image.service';
import { Types } from 'mongoose';


@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly uploadService: UploadService,
        @InjectMapper() private readonly mapper: AutoMapper
    ) {
        super(productRepository)
    }

    async createProduct({ name, price, amount, file}: CreateProductDto): Promise<Product> {
        // Create Image Product
        const imageDb = await this.uploadService.createImg(file)
        console.log('imageDatabase ' + imageDb)

        const paramsProduct = {
            name,
            price,
            amount,
            imageProduct:Types.ObjectId(imageDb.id)
        }
        return this.productRepository.createProduct(paramsProduct)
    } 
}
