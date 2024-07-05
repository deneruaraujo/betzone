import { Activity } from 'src/domain/main/enterprise/entities/activity';

export class ActivityPresenter {
  static toHTTP(activity: Activity) {
    return {
      id: activity.id.toString(),
      name: activity.name,
      description: activity.description,
      status: activity.status,
      category: activity.category,
    };
  }
}
