import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ActivityStatus } from 'src/core/enum/activitystatus.enum';
import {
  Activity,
  ActivityProps,
} from 'src/domain/main/enterprise/entities/activity';
import { PrismaActivityMapper } from 'src/infra/database/prisma/mappers/prisma-activity-mapper';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export function makeActivity(
  override: Partial<ActivityProps>,
  id?: UniqueEntityId,
) {
  const activity = Activity.create(
    {
      name: 'Futebol',
      description:
        'Esporte de equipe jogado com uma bola em que o objetivo é marcar gols.',
      status: ActivityStatus.Active,
      category: 'Invasão',
      ...override,
    },
    id,
  );

  return activity;
}

@Injectable()
export class ActivityFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaActivity(
    data: Partial<ActivityProps> = {},
  ): Promise<Activity> {
    const activity = makeActivity(data);

    await this.prisma.activity.create({
      data: PrismaActivityMapper.toPrisma(activity),
    });

    return activity;
  }
}
