import { Controller, Get, Query } from '@nestjs/common';
import { FetchActivitiesUseCase } from 'src/domain/main/application/use-cases/fetch-activities';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { ActivityPresenter } from '../presenters/activity-presenter';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
@Controller('/activities')
export class FetchActivitiesController {
  constructor(private fetchActivities: FetchActivitiesUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchActivities.execute({
      page,
    });

    const activities = result.value.activities;

    return { activities: activities.map(ActivityPresenter.toHTTP) };
  }
}
