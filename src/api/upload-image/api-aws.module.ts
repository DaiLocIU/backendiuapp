import { Module } from '@nestjs/common';
import { UploadService } from './upload-image.service'
import { UploadController } from './upload-image.controller';

@Module({
    controllers:[UploadController],
    providers:[UploadService],
    exports:[UploadService]
})
export class ApiUploadImageModule {}