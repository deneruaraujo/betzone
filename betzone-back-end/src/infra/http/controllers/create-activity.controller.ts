import { ActivityStatus } from 'src/core/enum/activityStatus.enum';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateActivityUseCase } from 'src/domain/main/application/use-cases/create-activity';

const createActivityBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum([ActivityStatus.Active, ActivityStatus.Inactive]),
  category: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createActivityBodySchema);

type CreateActivityBodySchema = z.infer<typeof createActivityBodySchema>;

@Controller('/activities')
export class CreateActivityController {
  constructor(private createActivity: CreateActivityUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateActivityBodySchema) {
    const { name, description, status, category } = body;

    const result = await this.createActivity.execute({
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
