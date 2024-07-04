import { InMemoryActivitiesRepository } from 'test/repositories/in-memory-activities-repository';
import { DeleteActivityUseCase } from './delete-activity';
import { makeActivity } from 'test/factories/make-activity';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';

let inMemoryActivitiesRepository: InMemoryActivitiesRepository;
let sut: DeleteActivityUseCase;

describe('Delete Activity', () => {
  beforeEach(() => {
    inMemoryActivitiesRepository = new InMemoryActivitiesRepository();
    sut = new DeleteActivityUseCase(inMemoryActivitiesRepository);
  });

  it('should be able to delete an activity', async () => {
    const activity = makeActivity({});

    await inMemoryActivitiesRepository.create(activity);

    const result = await sut.execute({
      activityId: activity.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryActivitiesRepository.items).toHaveLength(0);
  });

  it('should not be able to delete an activity that does not exist', async () => {
    const activity = makeActivity({});

    await inMemoryActivitiesRepository.create(activity);

    const result = await sut.execute({
      activityId: 'user-01', // user id that does not exist to cause an error
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
