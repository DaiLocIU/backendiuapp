import {Controller, Post, UseInterceptors, Req, UploadedFile} from '@nestjs/common'
import { UploadService } from './upload-image.service'
import {FileInterceptor} from '@nestjs/platform-express'
import { ApiController, ApiOperationId, ApiFile } from '../common/decorators/swagger.decorator'
import { ApiConsumes } from '@nestjs/swagger'
import { primaryStoreMulterOption } from '../../shared/utils/index'

@ApiController('test', 'Uploadfile')
@Controller("test")
export class UploadController {
    constructor(private uploadService: UploadService) {}
    
    @Post('uploadFile')
    @ApiOperationId()
    @ApiConsumes('multipart/form-data')
    @ApiFile()
    @UseInterceptors(FileInterceptor('file',{
        storage: primaryStoreMulterOption
    } ))
    async uploadFile(@UploadedFile() file:any) {
        console.log(file)
        return await this.uploadService.uploadFile(file.path)
    }
}