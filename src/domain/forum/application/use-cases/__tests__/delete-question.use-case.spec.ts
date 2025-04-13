import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question.use-case';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let repository: InMemoryQuestionRepository;
let useCase: DeleteQuestionUseCase;

describe('delete question use case', () => {
	beforeEach(() => {
		repository = new InMemoryQuestionRepository();
		useCase = new DeleteQuestionUseCase(repository);
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

		await repository.create(createdQuestion);

		const { isRight } = await useCase.execute({
			authorId: createdQuestionAuthorId.toString(),
			questionId: createdQuestionId.toString(),
		});

		expect(isRight()).toBe(true);
		expect(repository.questions).toHaveLength(0);
	});

	it('should throw an error if question is not found', async () => {
		const { isLeft, value } = await useCase.execute({
			authorId: 'author-id',
			questionId: 'question-id',
		});

		expect(isLeft()).toBe(true);
		expect(value).toBeInstanceOf(ResourceNotFoundError);
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

		await repository.create(createdQuestion);

		const { isLeft, value } = await useCase.execute({
			authorId: 'another-author-id',
			questionId: createdQuestionId.toString(),
		});

		expect(isLeft()).toBe(true);
		expect(value).toBeInstanceOf(NotAllowedError);
	});
});
