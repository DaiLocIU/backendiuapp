import { Module } from '@nestjs/common';
import { BackgroundEmailJobModule } from '../background/email-job/background-email-job.module';

export const backgroundModules = [
  BackgroundEmailJobModule,
];

@Module({ imports: [...backgroundModules] })
export class BackgroundModule {}
