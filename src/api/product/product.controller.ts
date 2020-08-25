import {Controller, Post, UseInterceptors,  UploadedFile, Body, Get, Param} from '@nestjs/common'
import { ApiController, ApiOperationId } from '../common/decorators/swagger.decorator'
import { ProductService } from './product.service'
import { ApiConsumes, ApiBody } from '@nestjs/swagger'
import { primaryStoreMulterOption } from 'src/shared/utils'
import { Product } from 'src/shared/product/product.model'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateProductDto } from '../dtos/request-params/create-product.dto'
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model'

@ApiController('product', 'Product')
@Controller("product")
export class ProductController {
    constructor(
        private ProductService: ProductService,
    ) {}

  
    @Post()
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

    @Get(':id')
    @ApiOperationId({summary:'Get Product By Id'})
    async getProductById(@Param('id') id:string): Promise<Product> {
        return this.ProductService.getProductById(id)
    }

    @Get(':id/img')
    @ApiOperationId({summary:'Get Img By ProductId'})
    async getImgByProductId(@Param('id') id:string): Promise<ImgProduct> {
        return this.ProductService.getImgByProductId(id)
    }
}