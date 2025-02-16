import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.value-object';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let repository: InMemoryQuestionRepository;
let useCase: GetQuestionBySlugUseCase;

describe('get question by slug use case', () => {
	beforeEach(() => {
		repository = new InMemoryQuestionRepository();
		useCase = new GetQuestionBySlugUseCase(repository);
	});

	it('should be able to get a question by slug', async () => {
		const createdQuestion = makeQuestion({
			slug: Slug.create('question-title'),
		});

		await repository.create(createdQuestion);

		const { question } = await useCase.execute({
			slug: 'question-title',
		});

		expect(createdQuestion.title).toEqual(question.title);
	});

	it('should throw an error if question is not found', async () => {
		await expect(useCase.execute({ slug: 'question-title' })).rejects.toThrow(
			'Question not found',
		);
	});
});
