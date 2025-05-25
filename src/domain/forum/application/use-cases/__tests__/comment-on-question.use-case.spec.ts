import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question.use-case';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryQuestionCommentRepository } from '@/test/repositories/in-memory-question-comment-repository';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let questionRepository: InMemoryQuestionRepository;
let questionCommentRepository: InMemoryQuestionCommentRepository;
let useCase: CommentOnQuestionUseCase;

describe('comment on question use case', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		questionCommentRepository = new InMemoryQuestionCommentRepository();
		useCase = new CommentOnQuestionUseCase(
			questionRepository,
			questionCommentRepository,
		);
	});

	it('should be able to comment on a question', async () => {
		const question = makeQuestion();
		await questionRepository.create(question);

		const result = await useCase.execute({
			questionId: question.id.toString(),
			authorId: 'author-1',
			content: 'Test comment',
		});

		expect(result.isRight()).toBeTruthy();
		expect(questionCommentRepository.questionComments[0].content).toBe(
			'Test comment',
		);
	});

	it('should not be able to comment on a non-existent question', async () => {
		const result = await useCase.execute({
			questionId: 'non-existent-question',
			authorId: 'author-1',
			content: 'Test comment',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
