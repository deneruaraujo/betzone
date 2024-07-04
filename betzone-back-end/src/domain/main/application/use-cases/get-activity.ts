import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';
import { Activity } from '../../enterprise/entities/activity';
import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activity-repository';

interface GetActivityUseCaseRequest {
  activityId: string;
}

type GetActivityUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    activity: Activity;
  }
>;
@Injectable()
export class GetActivityUseCase {
  constructor(private activitiesRepository: ActivitiesRepository) {}

  async execute({
    activityId,
  }: GetActivityUseCaseRequest): Promise<GetActivityUseCaseResponse> {
    const activity = await this.activitiesRepository.findById(activityId);

    if (!activity) {
      return left(new ResourceNotFoundError());
    }

    return right({
      activity,
    });
  }
}
