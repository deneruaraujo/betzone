import { Activity } from '../../enterprise/entities/activity';

export abstract class ActivitiesRepository {
  abstract create(activity: Activity): Promise<void>;
  abstract findById(id: string): Promise<Activity | null>;
  abstract save(activity: Activity): Promise<void>;
}
