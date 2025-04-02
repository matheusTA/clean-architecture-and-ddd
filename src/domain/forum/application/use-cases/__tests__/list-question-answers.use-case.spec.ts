import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';

let repository: InMemoryAnswerRepository;
let useCase: ListQuestionAnswersUseCase;

describe('list question answers use case', () => {
	beforeEach(() => {
		repository = new InMemoryAnswerRepository();
		useCase = new ListQuestionAnswersUseCase(repository);
	});

	it('should be able to list question answers', async () => {
		const question = makeQuestion();

		await repository.create(
			makeAnswer({
				questionId: question.id,
				createdAt: new Date(2023, 0, 20),
			}),
		);
		await repository.create(
			makeAnswer({
				questionId: question.id,
				createdAt: new Date(2023, 0, 18),
			}),
		);
		await repository.create(
			makeAnswer({
				questionId: question.id,
				createdAt: new Date(2023, 0, 25),
			}),
		);

		const { answers } = await useCase.execute({
			questionId: question.id.toString(),
			page: 1,
		});

		expect(answers).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
		]);
	});

	it('should be able to list paginated question answers', async () => {
		const question = makeQuestion();

		for (let i = 0; i < 22; i++) {
			await repository.create(
				makeAnswer({
					questionId: question.id,
					createdAt: new Date(2023, 0, 20),
				}),
			);
		}

		const { answers } = await useCase.execute({
			questionId: question.id.toString(),
			page: 2,
		});

		expect(answers).toHaveLength(2);
	});
});
