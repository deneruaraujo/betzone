import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';
import { ActivitiesRepository } from '../repositories/activity-repository';

interface DeleteActivityUseCaseRequest {
  activityId: string;
}

type DeleteActivityUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, never>
>;

@Injectable()
export class DeleteActivityUseCase {
  constructor(private activitiesRepository: ActivitiesRepository) {}

  async execute({
    activityId,
  }: DeleteActivityUseCaseRequest): Promise<DeleteActivityUseCaseResponse> {
    const activity = await this.activitiesRepository.findById(activityId);

    if (!activity) {
      return left(new ResourceNotFoundError());
    }

    await this.activitiesRepository.delete(activity);

    return right({});
  }
}
