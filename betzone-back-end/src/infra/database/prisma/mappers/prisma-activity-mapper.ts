import { Activity } from 'src/domain/main/enterprise/entities/activity';
import { Prisma, Activity as PrismaActivity } from '@prisma/client';
import { ActivityStatus } from 'src/core/enum/activityStatus.enum';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';

export class PrismaActivityMapper {
  static toDomain(raw: PrismaActivity): Activity {
    return Activity.create(
      {
        name: raw.name,
        description: raw.description,
        status:
          raw.status === ActivityStatus.Active
            ? ActivityStatus.Active
            : ActivityStatus.Inactive,
        category: raw.category,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPrisma(activity: Activity): Prisma.ActivityUncheckedCreateInput {
    return {
      id: activity.id.toString(),
      name: activity.name,
      description: activity.description,
      status: activity.status,
      category: activity.category,
      createdAt: activity.createdAt,
      updatedAt: activity.updatedAt,
    };
  }
}
