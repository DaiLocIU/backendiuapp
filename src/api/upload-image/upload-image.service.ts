import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { InjectCloudinaryConfig } from '../configuration/cloudinary.configuration';
import {CloudinaryConfig} from '../types/index'
import { primaryStoreMulterOption } from '../../shared/utils/index'

@Injectable()
export class UploadService {
    constructor(@InjectCloudinaryConfig() private readonly cloudinaryConfig: CloudinaryConfig) {
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
       
}
