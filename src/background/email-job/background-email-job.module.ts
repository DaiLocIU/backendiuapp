import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import {
  emailQueueName, queueProviderFactory,
} from '../../background/common/queues';
import { ApiEmailModule } from '../../api/email/api-email.module';
import { redisConfiguration } from '../../api/configuration/redis.configuration';
import { EmailJobConsumer } from './email-job.consumer';

@Global()
@Module({
  imports: [
    BullModule.registerQueueAsync({
      inject: [redisConfiguration.KEY],
      name: emailQueueName,
      useFactory: queueProviderFactory(emailQueueName),
    }),
    ApiEmailModule,
  ],
  providers: [EmailJobConsumer],
  exports: [BullModule],
})
export class BackgroundEmailJobModule {}
