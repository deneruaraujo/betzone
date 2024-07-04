import { Activity } from '../../enterprise/entities/activity';

export abstract class ActivitiesRepository {
  abstract create(activity: Activity): Promise<void>;
}
