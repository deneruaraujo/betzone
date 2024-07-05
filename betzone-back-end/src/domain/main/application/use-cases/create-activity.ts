import { Either, right } from 'src/core/either';
import { ActivityStatus } from 'src/core/enum/activityStatus.enum';
import { Activity } from '../../enterprise/entities/activity';
import { ActivitiesRepository } from '../repositories/activity-repository';
import { Injectable } from '@nestjs/common';

interface CreateActivityUseCaseRequest {
  name: string;
  description: string;
  status: ActivityStatus;
  category: string;
}

type CreateActivityUseCaseResponse = Either<
  null,
  {
    activity: Activity;
  }
>;
@Injectable()
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
