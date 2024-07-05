import { ActivityStatus } from 'src/core/enum/activityStatus.enum';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common';
import { EditActivityUseCase } from 'src/domain/main/application/use-cases/edit-activity';

const editActivityBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum([ActivityStatus.Active, ActivityStatus.Inactive]),
  category: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editActivityBodySchema);

type EditActivityBodySchema = z.infer<typeof editActivityBodySchema>;

@Controller('/activities/:id')
export class EditActivityController {
  constructor(private editActivity: EditActivityUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditActivityBodySchema,
    @Param('id') activityId: string,
  ) {
    const { name, description, status, category } = body;

    const result = await this.editActivity.execute({
      activityId,
      name,
      description,
      status,
      category,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
