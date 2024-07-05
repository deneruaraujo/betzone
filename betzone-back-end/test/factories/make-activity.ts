import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { ActivityStatus } from 'src/core/enum/activitystatus.enum';
import {
  Activity,
  ActivityProps,
} from 'src/domain/main/enterprise/entities/activity';

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
