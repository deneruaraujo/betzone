import { InMemoryActivitiesRepository } from 'test/repositories/in-memory-activities-repository';
import { CreateActivityUseCase } from './create-activity';
import { StatusActivity } from 'src/core/enum/statusActivity.enum';

let inMemoryActivitiesRepository: InMemoryActivitiesRepository;
let sut: CreateActivityUseCase;

describe('Create Activity', () => {
  beforeEach(() => {
    inMemoryActivitiesRepository = new InMemoryActivitiesRepository();
    sut = new CreateActivityUseCase(inMemoryActivitiesRepository);
  });

  it('should be able to create an activity', async () => {
    const result = await sut.execute({
      name: 'Futebol',
      description:
        'Esporte de equipe jogado com uma bola em que o objetivo é marcar gols.',
      status: StatusActivity.Active,
      category: 'Esporte de equipe',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryActivitiesRepository.items[0]).toEqual(
      result.value.activity,
    );
  });
});
