import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question.use-case';
import { makeQuestion } from '@/test/factories/make-question';
import { makeQuestionAttachment } from '@/test/factories/make-question-attachment';
import { InMemoryQuestionAttachmentRepository } from '@/test/repositories/in-memory-question-attachment-repository';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let Questionrepository: InMemoryQuestionRepository;
let questionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let useCase: EditQuestionUseCase;

describe('edit question use case', () => {
	beforeEach(() => {
		Questionrepository = new InMemoryQuestionRepository();
		questionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
		useCase = new EditQuestionUseCase(
			Questionrepository,
			questionAttachmentRepository,
		);
	});

	it('should be able to edit a question', async () => {
		const createdQuestionAuthorId = new UniqueEntityID();
		const createdQuestionId = new UniqueEntityID();
		const createdQuestion = makeQuestion(
			{
				authorId: createdQuestionAuthorId,
			},
			createdQuestionId,
		);

		await Questionrepository.create(createdQuestion);

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
			title: 'new title',
			content: 'new content',
			attachmentsIds: ['1', '3'],
		});

		expect(result.isRight()).toBe(true);
		expect(Questionrepository.questions[0]).toMatchObject({
			title: 'new title',
			content: 'new content',
		});
		expect(
			Questionrepository.questions[0].attachments.currentItems.length,
		).toBe(2);
		expect(Questionrepository.questions[0].attachments.currentItems).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueEntityID('1'),
			}),
			expect.objectContaining({
				attachmentId: new UniqueEntityID('3'),
			}),
		]);
	});

	it('should throw an error if question is not found', async () => {
		const result = await useCase.execute({
			authorId: 'author-id',
			questionId: 'question-id',
			title: 'title',
			content: 'content',
			attachmentsIds: [],
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

		await Questionrepository.create(createdQuestion);

		const result = await useCase.execute({
			authorId: 'another-author-id',
			questionId: createdQuestionId.toString(),
			title: 'title',
			content: 'content',
			attachmentsIds: [],
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
