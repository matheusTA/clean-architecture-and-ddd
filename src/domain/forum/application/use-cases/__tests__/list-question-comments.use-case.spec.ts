import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments.use-case';
import { makeQuestion } from '@/test/factories/make-question';
import { makeQuestionComment } from '@/test/factories/make-question-comment';
import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository';
import { expect } from 'vitest';

let questionCommentRepository: InMemoryQuestionCommentRepository;
let useCase: ListQuestionCommentsUseCase;

describe('list question comments use case', () => {
	beforeEach(() => {
		questionCommentRepository = new InMemoryQuestionCommentRepository();
		useCase = new ListQuestionCommentsUseCase(questionCommentRepository);
	});

	it('should be able to list question comments', async () => {
		const question = makeQuestion();
		const questionComment1 = makeQuestionComment({
			questionId: question.id,
			createdAt: new Date(2023, 0, 20),
		});
		const questionComment2 = makeQuestionComment({
			questionId: question.id,
			createdAt: new Date(2023, 0, 18),
		});
		const questionComment3 = makeQuestionComment({
			questionId: question.id,
			createdAt: new Date(2023, 0, 25),
		});

		await questionCommentRepository.create(questionComment1);
		await questionCommentRepository.create(questionComment2);
		await questionCommentRepository.create(questionComment3);

		const { questionComments } = await useCase.execute({
			questionId: question.id.toString(),
			page: 1,
		});

		expect(questionComments).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
		]);
	});

	it('should be able to list paginated question comments', async () => {
		const question = makeQuestion();

		for (let i = 0; i < 22; i++) {
			await questionCommentRepository.create(
				makeQuestionComment({
					questionId: question.id,
					createdAt: new Date(2023, 0, 20),
				}),
			);
		}

		const { questionComments } = await useCase.execute({
			questionId: question.id.toString(),
			page: 2,
		});

		expect(questionComments).toHaveLength(2);
	});
});
