import { Either, right } from 'src/core/either';
import { Activity } from '../../enterprise/entities/activity';
import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from '../repositories/activity-repository';

interface FetchActivitiesUseCaseRequest {
  page: number;
}

type FetchActivitiesUseCaseResponse = Either<
  null,
  {
    activities: Activity[];
  }
>;

@Injectable()
export class FetchActivitiesUseCase {
  constructor(private activitiesRepository: ActivitiesRepository) {}

  async execute({
    page,
  }: FetchActivitiesUseCaseRequest): Promise<FetchActivitiesUseCaseResponse> {
    const activities = await this.activitiesRepository.findManyById({
      page,
    });

    return right({
      activities,
    });
  }
}
