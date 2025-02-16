import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { expect } from 'vitest';
import { AnswerQuestionUseCase } from '../answer-question.use-case';

let repository: InMemoryAnswerRepository;
let useCase: AnswerQuestionUseCase;

describe('answer question use case', () => {
	beforeEach(() => {
		repository = new InMemoryAnswerRepository();
		useCase = new AnswerQuestionUseCase(repository);
	});

	it('should create an answer', async () => {
		const { answer } = await useCase.execute({
			authorId: 'author-id',
			questionId: 'question-id',
			answerContent: 'answer content',
		});

		expect(answer.content).toBe('answer content');
	});
});
