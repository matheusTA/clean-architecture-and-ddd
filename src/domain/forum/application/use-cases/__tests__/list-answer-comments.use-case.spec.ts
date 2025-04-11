import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comments.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeAnswerComment } from '@/test/factories/make-answer-comment';
import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comment-repository';
import { expect } from 'vitest';

let answerCommentRepository: InMemoryAnswerCommentRepository;
let useCase: ListAnswerCommentsUseCase;

describe('list answer comments use case', () => {
	beforeEach(() => {
		answerCommentRepository = new InMemoryAnswerCommentRepository();
		useCase = new ListAnswerCommentsUseCase(answerCommentRepository);
	});

	it('should be able to list answer comments', async () => {
		const answer = makeAnswer();
		const answerComment1 = makeAnswerComment({
			answerId: answer.id,
			createdAt: new Date(2023, 0, 20),
		});
		const answerComment2 = makeAnswerComment({
			answerId: answer.id,
			createdAt: new Date(2023, 0, 18),
		});
		const answerComment3 = makeAnswerComment({
			answerId: answer.id,
			createdAt: new Date(2023, 0, 25),
		});

		await answerCommentRepository.create(answerComment1);
		await answerCommentRepository.create(answerComment2);
		await answerCommentRepository.create(answerComment3);

		const { answerComments } = await useCase.execute({
			answerId: answer.id.toString(),
			page: 1,
		});

		expect(answerComments).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 0, 18) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
			expect.objectContaining({ createdAt: new Date(2023, 0, 25) }),
		]);
	});

	it('should be able to list paginated answer comments', async () => {
		const answer = makeAnswer();

		for (let i = 0; i < 22; i++) {
			await answerCommentRepository.create(
				makeAnswerComment({
					answerId: answer.id,
					createdAt: new Date(2023, 0, 20),
				}),
			);
		}

		const { answerComments } = await useCase.execute({
			answerId: answer.id.toString(),
			page: 2,
		});

		expect(answerComments).toHaveLength(2);
	});
});
