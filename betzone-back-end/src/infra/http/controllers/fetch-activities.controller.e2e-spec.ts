import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/infra/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ActivityFactory } from 'test/factories/make-activity';
import request from 'supertest';

describe('Fetch Activities (E2E)', () => {
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

  test('[GET] /activities', async () => {
    await Promise.all([
      activityFactory.makePrismaActivity({
        name: 'Activity-01',
      }),
      activityFactory.makePrismaActivity({
        name: 'Activity-02',
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get('/activities')
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      activities: expect.arrayContaining([
        expect.objectContaining({ name: 'Activity-01' }),
        expect.objectContaining({ name: 'Activity-02' }),
      ]),
    });
  });
});
