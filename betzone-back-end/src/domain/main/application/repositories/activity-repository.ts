import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Activity } from '../../enterprise/entities/activity';

export abstract class ActivitiesRepository {
  abstract create(activity: Activity): Promise<void>;
  abstract findById(id: string): Promise<Activity | null>;
  abstract save(activity: Activity): Promise<void>;
  abstract delete(activity: Activity): Promise<void>;
  abstract findMany(paginationParams: PaginationParams): Promise<Activity[]>;
}
