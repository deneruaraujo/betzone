import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateActivityController } from './controllers/create-activity.controller';
import { CreateActivityUseCase } from 'src/domain/main/application/use-cases/create-activity';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateActivityController],
  providers: [CreateActivityUseCase],
})
export class HttpModule {}
