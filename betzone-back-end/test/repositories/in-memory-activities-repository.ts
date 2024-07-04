import { ActivitiesRepository } from 'src/domain/main/application/repositories/activity-repository';
import { Activity } from 'src/domain/main/enterprise/entities/activity';

export class InMemoryActivitiesRepository implements ActivitiesRepository {
  public items: Activity[] = [];

  async create(activity: Activity): Promise<void> {
    this.items.push(activity);
  }
}
