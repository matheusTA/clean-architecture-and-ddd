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
		await expect(() =>
			useCase.execute({
				answerCommentId: 'non-existent-comment',
				authorId: 'author-1',
			}),
		).rejects.toThrow('Answer comment not found.');
	});

	it('should not be able to delete an answer comment from another author', async () => {
		const answerComment = makeAnswerComment();
		await answerCommentRepository.create(answerComment);

		await expect(() =>
			useCase.execute({
				answerCommentId: answerComment.id.toString(),
				authorId: 'wrong-author-id',
			}),
		).rejects.toThrow('Not allowed.');
	});
});
