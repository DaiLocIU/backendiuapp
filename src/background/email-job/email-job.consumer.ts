import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from 'src/api/email/email.service';
import { EmailTemplate } from 'src/api/email/email.template-enum';
import { emailQueueName } from '../common/queues';
import { EmailJob } from '../common/email-job.enum';
import { VerifyRegistrationEmailData } from '../common/interfaces/verify-registration-email-data.interface';

@Processor(emailQueueName)
export class EmailJobConsumer {
  constructor(private readonly emailService: EmailService) {}

  @Process(EmailJob.VerifyRegistration)
  async sendVerifyRegistrationEmail(job: Job<VerifyRegistrationEmailData>) {
    const { email, ...emailData } = job.data;
    return await this.emailService.sendByTemplate(
      EmailTemplate.VerifyRegistration,
      {
        from: '',
        to: email,
        templateId: EmailTemplate.VerifyRegistration,
        dynamicTemplateData: emailData,
      },
    );
  }
}
