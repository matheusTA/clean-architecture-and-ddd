import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions.use-case';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';

let repository: InMemoryQuestionRepository;
let useCase: ListRecentQuestionsUseCase;

describe('list recent questions use case', () => {
	beforeEach(() => {
		repository = new InMemoryQuestionRepository();
		useCase = new ListRecentQuestionsUseCase(repository);
	});

	it('should be able to list recent questions', async () => {
		repository.create(makeQuestion({ createdAt: new Date(2023, 0, 20) }));
		repository.create(makeQuestion({ createdAt: new Date(2023, 0, 18) }));
		repository.create(makeQuestion({ createdAt: new Date(2023, 0, 25) }));

		const result = await useCase.execute({
			page: 1,
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.questions).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
		]);
	});

	it('should be able to list paginated recent questions', async () => {
		for (let i = 0; i < 22; i++) {
			repository.create(
				makeQuestion({
					createdAt: new Date(2023, 0, 20),
				}),
			);
		}

		const result = await useCase.execute({
			page: 2,
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.questions).toHaveLength(2);
	});
});
