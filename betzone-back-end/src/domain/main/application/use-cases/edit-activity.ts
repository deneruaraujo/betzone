import { Either, left, right } from 'src/core/either';
import { StatusActivity } from 'src/core/enum/statusActivity.enum';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';
import { Activity } from '../../enterprise/entities/activity';
import { ActivitiesRepository } from '../repositories/activity-repository';
import { Injectable } from '@nestjs/common';

interface EditActivityUseCaseRequest {
  activityId: string;
  name: string;
  description: string;
  status: StatusActivity;
  category: string;
}

type EditActivityUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    activity: Activity;
  }
>;
@Injectable()
export class EditActivityUseCase {
  constructor(private activityRepository: ActivitiesRepository) {}

  async execute({
    activityId,
    name,
    description,
    status,
    category,
  }: EditActivityUseCaseRequest): Promise<EditActivityUseCaseResponse> {
    const activity = await this.activityRepository.findById(activityId);

    if (!activity) {
      return left(new ResourceNotFoundError());
    }

    activity.name = name;
    activity.description = description;
    activity.status = status;
    activity.category = category;

    await this.activityRepository.save(activity);

    return right({
      activity,
    });
  }
}
