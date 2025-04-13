import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer.use-case';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
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

		const { isRight } = await useCase.execute({
			authorId: createdAnswerAuthorId.toString(),
			answerId: createdAnswerId.toString(),
		});

		expect(isRight()).toBe(true);
		expect(repository.answers).toHaveLength(0);
	});

	it('should throw an error if answer is not found', async () => {
		const { isLeft, value } = await useCase.execute({
			authorId: 'author-id',
			answerId: 'answer-id',
		});

		expect(isLeft()).toBe(true);
		expect(value).toBeInstanceOf(ResourceNotFoundError);
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

		const { isLeft, value } = await useCase.execute({
			authorId: 'another-author-id',
			answerId: createdAnswerId.toString(),
		});

		expect(isLeft()).toBe(true);
		expect(value).toBeInstanceOf(NotAllowedError);
	});
});
