import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question.use-case';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let repository: InMemoryQuestionRepository;
let useCase: EditQuestionUseCase;

describe('edit question use case', () => {
	beforeEach(() => {
		repository = new InMemoryQuestionRepository();
		useCase = new EditQuestionUseCase(repository);
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

		await repository.create(createdQuestion);

		const result = await useCase.execute({
			authorId: createdQuestionAuthorId.toString(),
			questionId: createdQuestionId.toString(),
			title: 'new title',
			content: 'new content',
		});

		expect(result.isRight()).toBe(true);
		expect(repository.questions[0]).toMatchObject({
			title: 'new title',
			content: 'new content',
		});
	});

	it('should throw an error if question is not found', async () => {
		const result = await useCase.execute({
			authorId: 'author-id',
			questionId: 'question-id',
			title: 'title',
			content: 'content',
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

		await repository.create(createdQuestion);

		const result = await useCase.execute({
			authorId: 'another-author-id',
			questionId: createdQuestionId.toString(),
			title: 'title',
			content: 'content',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
