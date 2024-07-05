import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common';
import { DeleteActivityUseCase } from 'src/domain/main/application/use-cases/delete-activity';

@Controller('/activities/:id')
export class DeleteActivityController {
  constructor(private deleteActivity: DeleteActivityUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') activityId: string) {
    const result = await this.deleteActivity.execute({
      activityId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
