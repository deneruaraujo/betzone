import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ActivityFactory } from 'test/factories/make-activity';
import request from 'supertest';

describe('Edit Activity (E2E)', () => {
  let app: INestApplication;
  let activityFactory: ActivityFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ActivityFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    activityFactory = moduleRef.get(ActivityFactory);

    await app.init();
  });

  test('[GET] /activities/:id', async () => {
    const activity = await activityFactory.makePrismaActivity({
      name: 'Activity-01',
    });

    const activityId = activity.id.toString();

    const response = await request(app.getHttpServer())
      .get(`/activities/${activityId}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      activity: expect.objectContaining({ name: 'Activity-01' }),
    });
  });
});
