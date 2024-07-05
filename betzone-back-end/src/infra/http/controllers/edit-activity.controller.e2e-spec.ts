import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ActivityFactory } from 'test/factories/make-activity';
import request from 'supertest';

describe('Edit Activity (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let activityFactory: ActivityFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ActivityFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    activityFactory = moduleRef.get(ActivityFactory);

    await app.init();
  });

  test('[PUT] /activities/:id', async () => {
    const activity = await activityFactory.makePrismaActivity({});

    const activityId = activity.id.toString();

    const response = await request(app.getHttpServer())
      .put(`/activities/${activityId}`)
      .send({
        name: 'Edited name',
        description: 'Edited description',
        status: 'INACTIVE',
        category: 'Invasão',
      });

    expect(response.statusCode).toBe(204);

    const activityOnDatabase = await prisma.activity.findFirst({
      where: {
        name: 'Edited name',
        description: 'Edited description',
      },
    });

    expect(activityOnDatabase).toBeTruthy();
  });
});
