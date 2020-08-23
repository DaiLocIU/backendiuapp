import {Controller, Post, UseInterceptors,  UploadedFile, Body} from '@nestjs/common'
import { ApiController, ApiOperationId } from '../common/decorators/swagger.decorator'
import { ProductService } from './product.service'
import { ApiConsumes, ApiBody } from '@nestjs/swagger'
import { primaryStoreMulterOption } from 'src/shared/utils'
import { Product } from 'src/shared/product/product.model'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateProductDto } from '../dtos/request-params/create-product.dto'

@ApiController('product', 'Product')
@Controller("product")
export class ProductController {
    constructor(
        private ProductService: ProductService,
    ) {}

  
    @Post('create')
    @ApiOperationId({summary:'Create Product'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: CreateProductDto,
      })

    @UseInterceptors(FileInterceptor('file',{
        storage: primaryStoreMulterOption
    }))
    async create(@UploadedFile() file:any, @Body() body:CreateProductDto): Promise<Product> {
        const {name, price, amount } = body
        return this.ProductService.createProduct({name, price, amount, file: file.path})
    }
}