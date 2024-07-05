import { PrismaActivitiesRepository } from './prisma/repositories/prisma-activities-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ActivitiesRepository } from 'src/domain/main/application/repositories/activity-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ActivitiesRepository,
      useClass: PrismaActivitiesRepository,
    },
  ],
  exports: [PrismaService, ActivitiesRepository],
})
export class DatabaseModule {}
