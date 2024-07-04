import { InMemoryActivitiesRepository } from 'test/repositories/in-memory-activities-repository';
import { GetActivityUseCase } from './get-activity';
import { makeActivity } from 'test/factories/make-activity';

let inMemoryActivitiesRepository: InMemoryActivitiesRepository;
let sut: GetActivityUseCase;

describe('Get Activity Use Case', () => {
  beforeEach(() => {
    inMemoryActivitiesRepository = new InMemoryActivitiesRepository();
    sut = new GetActivityUseCase(inMemoryActivitiesRepository);
  });

  it('should be able to get an activity', async () => {
    const activity = makeActivity({});

    await inMemoryActivitiesRepository.create(activity);

    const result = await sut.execute({
      activityId: activity.id.toString(),
    });

    expect(result.isRight()).toBe(true);
  });

  it('should not be able to get an activity that does not exist', async () => {
    const activity = makeActivity({});

    await inMemoryActivitiesRepository.create(activity);

    const result = await sut.execute({
      activityId: 'user-01', // non-existent ID to trigger an error
    });

    expect(result.isLeft()).toBe(true);
  });
});
