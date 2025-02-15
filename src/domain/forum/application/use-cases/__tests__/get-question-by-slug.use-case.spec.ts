import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { Question } from '@/domain/forum/enterprise/entities/question.entity';
import { InMemoryQuestionRepository } from '@/test/in-memory-question-repository';
import { expect } from 'vitest';

let repository: InMemoryQuestionRepository;
let useCase: GetQuestionBySlugUseCase;

describe('get question by slug use case', () => {
	beforeEach(() => {
		repository = new InMemoryQuestionRepository();
		useCase = new GetQuestionBySlugUseCase(repository);
	});

	it('should be able to get a question by slug', async () => {
		const createdQuestion = Question.build({
			authorId: new UniqueEntityID(),
			title: 'Question title',
			content: 'Question content',
		});

		await repository.create(createdQuestion);

		const { question } = await useCase.execute({
			slug: 'question-title',
		});

		expect(question.title).toBe('Question title');
	});

	it('should throw an error if question is not found', async () => {
		await expect(useCase.execute({ slug: 'question-title' })).rejects.toThrow(
			'Question not found',
		);
	});
});
