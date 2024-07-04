import { Either, right } from 'src/core/either';
import { StatusActivity } from 'src/core/enum/statusActivity.enum';
import { Activity } from '../../enterprise/entities/activity';
import { ActivitiesRepository } from '../repositories/activity-repository';

interface CreateActivityUseCaseRequest {
  name: string;
  description: string;
  status: StatusActivity;
  category: string;
}

type CreateActivityUseCaseResponse = Either<
  null,
  {
    activity: Activity;
  }
>;

export class CreateActivityUseCase {
  constructor(private activityRepository: ActivitiesRepository) {}

  async execute({
    name,
    description,
    status,
    category,
  }: CreateActivityUseCaseRequest): Promise<CreateActivityUseCaseResponse> {
    const activity = Activity.create({
      name,
      description,
      status,
      category,
    });

    await this.activityRepository.create(activity);

    return right({
      activity,
    });
  }
}
