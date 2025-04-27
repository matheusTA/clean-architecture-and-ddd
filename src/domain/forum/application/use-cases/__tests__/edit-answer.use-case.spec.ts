import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer.use-case';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeAnswerAttachment } from '@/test/factories/make-answer-attachment';
import { InMemoryAnswerAttachmentRepository } from '@/test/repositories/in-memory-answer-attachment-repository';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';

let answerRepository: InMemoryAnswerRepository;
let answerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let useCase: EditAnswerUseCase;

describe('edit answer use case', () => {
	beforeEach(() => {
		answerRepository = new InMemoryAnswerRepository();
		answerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
		useCase = new EditAnswerUseCase(
			answerRepository,
			answerAttachmentRepository,
		);
	});

	it('should be able to edit a answer', async () => {
		const createdAnswerAuthorId = new UniqueEntityID();
		const createdAnswerId = new UniqueEntityID();
		const createdAnswer = makeAnswer(
			{
				authorId: createdAnswerAuthorId,
			},
			createdAnswerId,
		);

		await answerRepository.create(createdAnswer);

		answerAttachmentRepository.answerAttachments.push(
			makeAnswerAttachment({
				answerId: createdAnswerId,
				attachmentId: new UniqueEntityID('1'),
			}),
			makeAnswerAttachment({
				answerId: createdAnswerId,
				attachmentId: new UniqueEntityID('2'),
			}),
		);

		const result = await useCase.execute({
			authorId: createdAnswerAuthorId.toString(),
			answerId: createdAnswerId.toString(),
			content: 'new content',
			attachmentsIds: ['1', '3'],
		});

		expect(result.isRight()).toBe(true);
		expect(answerRepository.answers[0]).toMatchObject({
			content: 'new content',
		});
		expect(answerRepository.answers[0].attachments.currentItems.length).toBe(2);
		expect(answerRepository.answers[0].attachments.currentItems).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueEntityID('1'),
			}),
			expect.objectContaining({
				attachmentId: new UniqueEntityID('3'),
			}),
		]);
	});

	it('should throw an error if answer is not found', async () => {
		const result = await useCase.execute({
			authorId: 'author-id',
			answerId: 'answer-id',
			content: 'content',
			attachmentsIds: [],
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should throw an error if author is not the same as the answer author', async () => {
		const createdAnswerAuthorId = new UniqueEntityID();
		const createdAnswerId = new UniqueEntityID();
		const createdAnswer = makeAnswer(
			{
				authorId: createdAnswerAuthorId,
			},
			createdAnswerId,
		);

		await answerRepository.create(createdAnswer);

		const result = await useCase.execute({
			authorId: 'another-author-id',
			answerId: createdAnswerId.toString(),
			content: 'content',
			attachmentsIds: [],
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
