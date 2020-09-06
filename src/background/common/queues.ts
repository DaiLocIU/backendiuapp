import { BullModuleOptions } from '@nestjs/bull';
import { RedisConfig } from '../../api/types/index';

export const queueDefaultOptions = {
  defaultJobOptions: {
    attempts: 5,
    timeout: 10000,
  },
};

export const queueProviderFactory = (name: string) => (
  redisConfig: RedisConfig,
): BullModuleOptions => ({
  name,
  redis: {
    host: redisConfig.host,
    port: Number(redisConfig.port),
    password: redisConfig.password,
  },
  defaultJobOptions: queueDefaultOptions.defaultJobOptions,
});

export const emailQueueName = 'emailQueue';

export const queueNames = [emailQueueName];
