import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment.use-case';
import { makeAnswerComment } from '@/test/factories/make-answer-comment';
import { InMemoryAnswerCommentRepository } from '@/test/repositories/in-memory-answer-comment-repository';
import { expect } from 'vitest';

let answerCommentRepository: InMemoryAnswerCommentRepository;
let useCase: DeleteAnswerCommentUseCase;

describe('delete answer comment use case', () => {
	beforeEach(() => {
		answerCommentRepository = new InMemoryAnswerCommentRepository();
		useCase = new DeleteAnswerCommentUseCase(answerCommentRepository);
	});

	it('should be able to delete an answer comment', async () => {
		const answerComment = makeAnswerComment();
		await answerCommentRepository.create(answerComment);

		await useCase.execute({
			answerCommentId: answerComment.id.toString(),
			authorId: answerComment.authorId.toString(),
		});

		expect(answerCommentRepository.answerComments).toHaveLength(0);
	});

	it('should not be able to delete a non-existent answer comment', async () => {
		const result = await useCase.execute({
			answerCommentId: 'non-existent-comment',
			authorId: 'author-1',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete an answer comment from another author', async () => {
		const answerComment = makeAnswerComment();
		await answerCommentRepository.create(answerComment);

		const result = await useCase.execute({
			answerCommentId: answerComment.id.toString(),
			authorId: 'wrong-author-id',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
