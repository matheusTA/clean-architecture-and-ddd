import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question.use-case';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let repository: InMemoryQuestionRepository;
let useCase: CreateQuestionUseCase;

describe('create question use case', () => {
	beforeEach(() => {
		repository = new InMemoryQuestionRepository();
		useCase = new CreateQuestionUseCase(repository);
	});

	it('should create a question', async () => {
		const { question } = await useCase.execute({
			authorId: 'author-id',
			title: 'question title',
			content: 'answer content',
		});

		expect(question.id).toBeTruthy();
	});
});
