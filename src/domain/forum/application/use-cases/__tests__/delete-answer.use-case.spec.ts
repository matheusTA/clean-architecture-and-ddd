import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';

let repository: InMemoryAnswerRepository;
let useCase: DeleteAnswerUseCase;

describe('delete answer use case', () => {
	beforeEach(() => {
		repository = new InMemoryAnswerRepository();
		useCase = new DeleteAnswerUseCase(repository);
	});

	it('should be able to delete a answer by id', async () => {
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
		});

		expect(repository.answers).toHaveLength(0);
	});

	it('should throw an error if answer is not found', async () => {
		await expect(
			useCase.execute({ authorId: 'author-id', answerId: 'answer-id' }),
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
			}),
		).rejects.toThrow('Unauthorized');
	});
});
