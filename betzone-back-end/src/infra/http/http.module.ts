import { EditActivityUseCase } from './../../domain/main/application/use-cases/edit-activity';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateActivityController } from './controllers/create-activity.controller';
import { CreateActivityUseCase } from 'src/domain/main/application/use-cases/create-activity';
import { EditActivityController } from './controllers/edit-activity.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateActivityController, EditActivityController],
  providers: [CreateActivityUseCase, EditActivityUseCase],
})
export class HttpModule {}
