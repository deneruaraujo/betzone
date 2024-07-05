import { PrismaActivityMapper } from './../mappers/prisma-activity-mapper';
import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from 'src/domain/main/application/repositories/activity-repository';
import { PrismaService } from '../prisma.service';
import { Activity } from 'src/domain/main/enterprise/entities/activity';
import { PaginationParams } from 'src/core/repositories/pagination-params';

@Injectable()
export class PrismaActivitiesRepository implements ActivitiesRepository {
  constructor(private prisma: PrismaService) {}

  async create(activity: Activity): Promise<void> {
    const data = PrismaActivityMapper.toPrisma(activity);

    await this.prisma.activity.create({
      data,
    });
  }

  async save(activity: Activity): Promise<void> {
    const data = PrismaActivityMapper.toPrisma(activity);

    await this.prisma.activity.update({
      where: {
        id: activity.id.toString(),
      },
      data,
    });
  }

  async delete(activity: Activity): Promise<void> {
    const data = PrismaActivityMapper.toPrisma(activity);

    await this.prisma.activity.delete({
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<Activity | null> {
    const activity = await this.prisma.activity.findUnique({
      where: {
        id,
      },
    });

    if (!activity) {
      null;
    }

    return PrismaActivityMapper.toDomain(activity);
  }

  async findMany(paginationParams: PaginationParams): Promise<Activity[]> {
    const activities = await this.prisma.activity.findMany({
      take: 20,
      skip: (paginationParams.page - 1) * 20,
    });
    return activities.map(PrismaActivityMapper.toDomain);
  }
}
