import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { ActivityFactory } from 'test/factories/make-activity';
import { Test } from '@nestjs/testing';

import request from 'supertest';
import { AppModule } from 'src/infra/app.module';
import { DatabaseModule } from 'src/infra/database/database.module';

describe('Create Activity (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ActivityFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /activities', async () => {
    const response = await request(app.getHttpServer())
      .post('/activities')
      .send({
        name: 'Futebol',
        description: '',
        status: 'ACTIVE',
        category: 'Invasão',
      });

    expect(response.statusCode).toBe(201);

    const activityOnDatabase = await prisma.activity.findFirst({
      where: {
        name: 'Futebol',
      },
    });

    expect(activityOnDatabase).toBeTruthy();
  });
});
