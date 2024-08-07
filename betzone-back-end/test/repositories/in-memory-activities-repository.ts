import { PaginationParams } from 'src/core/repositories/pagination-params';
import { ActivitiesRepository } from 'src/domain/main/application/repositories/activity-repository';
import { Activity } from 'src/domain/main/enterprise/entities/activity';

export class InMemoryActivitiesRepository implements ActivitiesRepository {
  public items: Activity[] = [];

  async create(activity: Activity): Promise<void> {
    this.items.push(activity);
  }

  async findById(id: string): Promise<Activity | null> {
    const activity = this.items.find((item) => item.id.toString() === id);

    if (!activity) {
      return null;
    }

    return activity;
  }

  async save(activity: Activity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === activity.id);
    this.items[itemIndex] = activity;
  }

  async delete(activity: Activity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === activity.id);
    this.items.splice(itemIndex, 1);
  }

  async findMany({ page }: PaginationParams): Promise<Activity[]> {
    const activities = this.items.slice((page - 1) * 20, page * 20);

    return activities;
  }
}
