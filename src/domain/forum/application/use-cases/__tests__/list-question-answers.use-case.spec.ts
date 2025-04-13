import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';

let answerRepository: InMemoryAnswerRepository;
let useCase: ListQuestionAnswersUseCase;

describe('list question answers use case', () => {
	beforeEach(() => {
		answerRepository = new InMemoryAnswerRepository();
		useCase = new ListQuestionAnswersUseCase(answerRepository);
	});

	it('should be able to list question answers', async () => {
		const question = makeQuestion();
		const answer1 = makeAnswer({
			questionId: question.id,
			createdAt: new Date(2023, 0, 20),
		});
		const answer2 = makeAnswer({
			questionId: question.id,
			createdAt: new Date(2023, 0, 18),
		});
		const answer3 = makeAnswer({
			questionId: question.id,
			createdAt: new Date(2023, 0, 25),
		});

		await answerRepository.create(answer1);
		await answerRepository.create(answer2);
		await answerRepository.create(answer3);

		const result = await useCase.execute({
			questionId: question.id.toString(),
			page: 1,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.answers).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
		]);
	});

	it('should be able to list paginated question answers', async () => {
		const question = makeQuestion();

		for (let i = 0; i < 22; i++) {
			await answerRepository.create(
				makeAnswer({
					questionId: question.id,
					createdAt: new Date(2023, 0, 20),
				}),
			);
		}

		const result = await useCase.execute({
			questionId: question.id.toString(),
			page: 2,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.answers).toHaveLength(2);
	});
});
