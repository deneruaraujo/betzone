import { EditActivityUseCase } from './../../domain/main/application/use-cases/edit-activity';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateActivityController } from './controllers/create-activity.controller';
import { CreateActivityUseCase } from 'src/domain/main/application/use-cases/create-activity';
import { EditActivityController } from './controllers/edit-activity.controller';
import { DeleteActivityController } from './controllers/delete-activity.controller';
import { DeleteActivityUseCase } from 'src/domain/main/application/use-cases/delete-activity';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateActivityController,
    EditActivityController,
    DeleteActivityController,
  ],
  providers: [
    CreateActivityUseCase,
    EditActivityUseCase,
    DeleteActivityUseCase,
  ],
})
export class HttpModule {}
