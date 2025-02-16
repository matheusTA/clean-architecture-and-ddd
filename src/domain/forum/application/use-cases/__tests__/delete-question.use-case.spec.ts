import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question.use-case';
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

		await useCase.execute({
			authorId: createdQuestionAuthorId.toString(),
			questionId: createdQuestionId.toString(),
		});

		expect(repository.questions).toHaveLength(0);
	});

	it('should throw an error if question is not found', async () => {
		await expect(
			useCase.execute({ authorId: 'author-id', questionId: 'question-id' }),
		).rejects.toThrow('Question not found');
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

		await expect(
			useCase.execute({
				authorId: 'another-author-id',
				questionId: createdQuestionId.toString(),
			}),
		).rejects.toThrow('Unauthorized');
	});
});
