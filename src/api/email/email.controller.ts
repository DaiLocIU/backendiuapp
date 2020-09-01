import { Post } from '@nestjs/common';
import { ApiController, ApiOperationId } from '../common/decorators/swagger.decorator';
import { EmailService } from './email.service';
import { EmailTemplate } from './email.template-enum';

@ApiController('Email', 'email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {

  }

  @Post()
  @ApiOperationId({ summary: 'sendEmail' })
  async sendEmail() {
    return this.emailService.sendByTemplate(
      EmailTemplate.ResetPassword,
      {
        to: '1951012100quoc@ou.edu.vn',
        from: '1751012039loc@ou.edu.vn',
        templateId: EmailTemplate.ResetPassword,
        dynamicTemplateData: {
          token: 'Quoc ga',
        },
      },
    );
  }
}
