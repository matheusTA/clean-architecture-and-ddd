import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment.use-case';
import { makeQuestionComment } from '@/test/factories/make-question-comment';
import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository';
import { expect } from 'vitest';

let questionCommentRepository: InMemoryQuestionCommentRepository;
let useCase: DeleteQuestionCommentUseCase;

describe('delete question comment use case', () => {
	beforeEach(() => {
		questionCommentRepository = new InMemoryQuestionCommentRepository();
		useCase = new DeleteQuestionCommentUseCase(questionCommentRepository);
	});

	it('should be able to delete a question comment', async () => {
		const questionComment = makeQuestionComment();
		await questionCommentRepository.create(questionComment);

		await useCase.execute({
			questionCommentId: questionComment.id.toString(),
			authorId: questionComment.authorId.toString(),
		});

		expect(questionCommentRepository.questionComments).toHaveLength(0);
	});

	it('should not be able to delete a non-existent question comment', async () => {
		await expect(() =>
			useCase.execute({
				questionCommentId: 'non-existent-comment',
				authorId: 'author-1',
			}),
		).rejects.toThrow('Question comment not found.');
	});

	it('should not be able to delete a question comment from another author', async () => {
		const questionComment = makeQuestionComment();
		await questionCommentRepository.create(questionComment);

		await expect(() =>
			useCase.execute({
				questionCommentId: questionComment.id.toString(),
				authorId: 'wrong-author-id',
			}),
		).rejects.toThrow('Not allowed.');
	});
});
