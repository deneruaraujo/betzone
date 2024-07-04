import { InMemoryActivitiesRepository } from 'test/repositories/in-memory-activities-repository';
import { FetchActivitiesUseCase } from './fetch-activities';
import { makeActivity } from 'test/factories/make-activity';

let inMemoryActivitiesRepository: InMemoryActivitiesRepository;
let sut: FetchActivitiesUseCase;

describe('Fetch Activities', () => {
  beforeEach(() => {
    inMemoryActivitiesRepository = new InMemoryActivitiesRepository();
    sut = new FetchActivitiesUseCase(inMemoryActivitiesRepository);
  });

  it('should be able to fetch activities', async () => {
    await inMemoryActivitiesRepository.create(makeActivity({}));
    await inMemoryActivitiesRepository.create(makeActivity({}));
    await inMemoryActivitiesRepository.create(makeActivity({}));

    const result = await sut.execute({ page: 1 });

    expect(result.value.activities).toHaveLength(3);
  });

  it('should be able to fetch paginated activities', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryActivitiesRepository.create(makeActivity({}));
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value.activities).toHaveLength(2);
  });
});
