import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comment-repository';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';

let answerRepository: InMemoryAnswerRepository;
let answerCommentRepository: InMemoryAnswerCommentRepository;
let useCase: CommentOnAnswerUseCase;

describe('comment on answer use case', () => {
	beforeEach(() => {
		answerRepository = new InMemoryAnswerRepository();
		answerCommentRepository = new InMemoryAnswerCommentRepository();
		useCase = new CommentOnAnswerUseCase(
			answerRepository,
			answerCommentRepository,
		);
	});

	it('should be able to comment on an answer', async () => {
		const answer = makeAnswer();
		await answerRepository.create(answer);

		const result = await useCase.execute({
			answerId: answer.id.toString(),
			authorId: 'author-1',
			content: 'Test comment',
		});

		expect(result.isRight()).toBeTruthy();
		expect(answerCommentRepository.answerComments[0].content).toBe(
			'Test comment',
		);
	});

	it('should not be able to comment on a non-existent answer', async () => {
		const result = await useCase.execute({
			answerId: 'non-existent-answer',
			authorId: 'author-1',
			content: 'Test comment',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
