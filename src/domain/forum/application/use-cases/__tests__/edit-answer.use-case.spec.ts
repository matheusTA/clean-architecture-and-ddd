import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';

let repository: InMemoryAnswerRepository;
let useCase: EditAnswerUseCase;

describe('edit answer use case', () => {
	beforeEach(() => {
		repository = new InMemoryAnswerRepository();
		useCase = new EditAnswerUseCase(repository);
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

		await repository.create(createdAnswer);

		await useCase.execute({
			authorId: createdAnswerAuthorId.toString(),
			answerId: createdAnswerId.toString(),
			content: 'new content',
		});

		expect(repository.answers[0]).toMatchObject({
			content: 'new content',
		});
	});

	it('should throw an error if answer is not found', async () => {
		await expect(
			useCase.execute({
				authorId: 'author-id',
				answerId: 'answer-id',
				content: 'content',
			}),
		).rejects.toThrow('Answer not found');
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

		await repository.create(createdAnswer);

		await expect(
			useCase.execute({
				authorId: 'another-author-id',
				answerId: createdAnswerId.toString(),
				content: 'content',
			}),
		).rejects.toThrow('Unauthorized');
	});
});
