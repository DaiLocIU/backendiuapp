import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { InjectCloudinaryConfig } from '../configuration/cloudinary.configuration';
import {CloudinaryConfig} from '../types/index'
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { UploadRepository } from './upload-image.repository';
import { ImgProduct } from 'src/shared/imgProduct/imgProduct.model';
import { BaseService } from '../common/base.service';

@Injectable()
export class UploadService extends BaseService<ImgProduct> {
    constructor(
      @InjectCloudinaryConfig() private readonly cloudinaryConfig: CloudinaryConfig,
      private readonly uploadRepository: UploadRepository,
      @InjectMapper() private readonly mapper: AutoMapper

      ) {
        super(uploadRepository)
        cloudinary.config({
            cloud_name: cloudinaryConfig.cloud_name, 
            api_key: cloudinaryConfig.api_key, 
            api_secret: cloudinaryConfig.api_secret 
        })
      }

      async createImg(file:any): Promise<ImgProduct> {
        const imgFile = await this.uploadFile(file)
        const imgUrl = imgFile.secure_url

        return this.uploadRepository.createImgDb({imgBig:imgUrl})
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
       
}
