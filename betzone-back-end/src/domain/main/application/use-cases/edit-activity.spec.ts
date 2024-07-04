import { InMemoryActivitiesRepository } from 'test/repositories/in-memory-activities-repository';
import { EditActivityUseCase } from './edit-activity';
import { makeActivity } from 'test/factories/make-activity';
import { StatusActivity } from 'src/core/enum/statusActivity.enum';
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error';

let inMemoryActivitiesRepository: InMemoryActivitiesRepository;
let sut: EditActivityUseCase;

describe('Edit Activity', () => {
  beforeEach(() => {
    inMemoryActivitiesRepository = new InMemoryActivitiesRepository();
    sut = new EditActivityUseCase(inMemoryActivitiesRepository);
  });

  it('should be able to edit an activity', async () => {
    const activity = makeActivity({});

    await inMemoryActivitiesRepository.create(activity);

    const result = await sut.execute({
      activityId: activity.id.toString(),
      name: 'Test name',
      category: 'Test category',
      status: StatusActivity.Active,
      description: 'Test description',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      activity: inMemoryActivitiesRepository.items[0],
    });
  });

  it('should not be able to edit an activity that does not exist', async () => {
    const activity = makeActivity({});

    await inMemoryActivitiesRepository.create(activity);

    const result = await sut.execute({
      activityId: 'user-01', // non-existent ID to trigger an error
      name: 'Test name',
      category: 'Test category',
      status: StatusActivity.Active,
      description: 'Test description',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
