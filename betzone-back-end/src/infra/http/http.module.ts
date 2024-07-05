import { EditActivityUseCase } from './../../domain/main/application/use-cases/edit-activity';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateActivityController } from './controllers/create-activity.controller';
import { CreateActivityUseCase } from 'src/domain/main/application/use-cases/create-activity';
import { EditActivityController } from './controllers/edit-activity.controller';
import { DeleteActivityController } from './controllers/delete-activity.controller';
import { DeleteActivityUseCase } from 'src/domain/main/application/use-cases/delete-activity';
import { GetActivityController } from './controllers/get-activity.controller';
import { GetActivityUseCase } from 'src/domain/main/application/use-cases/get-activity';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateActivityController,
    EditActivityController,
    DeleteActivityController,
    GetActivityController,
  ],
  providers: [
    CreateActivityUseCase,
    EditActivityUseCase,
    DeleteActivityUseCase,
    GetActivityUseCase,
  ],
})
export class HttpModule {}
