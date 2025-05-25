import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question.use-case';
import { makeQuestion } from '@/test/factories/make-question';
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment';
import { InMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachment-repository';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let questionRepository: InMemoryQuestionRepository;
let questionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let useCase: DeleteQuestionUseCase;

describe('delete question use case', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		questionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
		useCase = new DeleteQuestionUseCase(
			questionRepository,
			questionAttachmentRepository,
		);
	});

	it('should be able to delete a question by id', async () => {
		const createdQuestionAuthorId = new UniqueEntityID();
		const createdQuestionId = new UniqueEntityID();
		const createdQuestion = makeQuestion(
			{
				authorId: createdQuestionAuthorId,
			},
			createdQuestionId,
		);

		await questionRepository.create(createdQuestion);

		questionAttachmentRepository.questionAttachments.push(
			makeQuestionAttachment({
				questionId: createdQuestionId,
				attachmentId: new UniqueEntityID('1'),
			}),
			makeQuestionAttachment({
				questionId: createdQuestionId,
				attachmentId: new UniqueEntityID('2'),
			}),
		);

		const result = await useCase.execute({
			authorId: createdQuestionAuthorId.toString(),
			questionId: createdQuestionId.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(questionRepository.questions).toHaveLength(0);
		expect(questionAttachmentRepository.questionAttachments).toHaveLength(0);
	});

	it('should throw an error if question is not found', async () => {
		const result = await useCase.execute({
			authorId: 'author-id',
			questionId: 'question-id',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should throw an error if author is not the same as the question author', async () => {
		const createdQuestionAuthorId = new UniqueEntityID();
		const createdQuestionId = new UniqueEntityID();
		const createdQuestion = makeQuestion(
			{
				authorId: createdQuestionAuthorId,
			},
			createdQuestionId,
		);

		await questionRepository.create(createdQuestion);

		const result = await useCase.execute({
			authorId: 'another-author-id',
			questionId: createdQuestionId.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
