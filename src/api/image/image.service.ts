import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { InjectCloudinaryConfig } from '../configuration/cloudinary.configuration';
import {CloudinaryConfig} from '../types/index'
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { ImageRepository } from './image.repository';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';
import { BaseService } from '../common/base.service';

@Injectable()
export class ImageService extends BaseService<ImgProduct> {
    constructor(
      @InjectCloudinaryConfig() private readonly cloudinaryConfig: CloudinaryConfig,
      private readonly imageRepository: ImageRepository,
      @InjectMapper() private readonly mapper: AutoMapper

      ) {
        super(imageRepository)
        cloudinary.config({
            cloud_name: cloudinaryConfig.cloud_name, 
            api_key: cloudinaryConfig.api_key, 
            api_secret: cloudinaryConfig.api_secret 
        })
      }
      async uploadFile(file: any): Promise<UploadApiResponse> {
        try {
            return await cloudinary.uploader.upload(file);
          } catch (e) {
            throw new InternalServerErrorException(
              e.response?.body?.errors || e,
              'Error upload image' + e.message
            );
          }
      }

      async createImg(file:any): Promise<ImgProduct> {
        const imgFile = await this.uploadFile(file)
        const imgUrl = imgFile.secure_url

        return this.imageRepository.createImgDb({imgBig:imgUrl})
      }

      async findImgById(id: string): Promise<ImgProduct> {
        return this.imageRepository.findImgById(id)
      }


      async updateImgById(id, file:any): Promise<ImgProduct> {
        const imgFile = await this.uploadFile(file)
        const imgUrl = imgFile.secure_url
        return this.imageRepository.updateImageById(id, {imgBig:imgUrl})
      }
}
