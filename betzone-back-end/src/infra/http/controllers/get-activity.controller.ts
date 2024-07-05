import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { GetActivityUseCase } from 'src/domain/main/application/use-cases/get-activity';
import { ActivityPresenter } from '../presenters/activity-presenter';

@Controller('/activities/:id')
export class GetActivityController {
  constructor(private getActivityInfo: GetActivityUseCase) {}

  @Get()
  async handle(@Param('id') activityId: string) {
    const result = await this.getActivityInfo.execute({
      activityId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { activity: ActivityPresenter.toHTTP(result.value.activity) };
  }
}
