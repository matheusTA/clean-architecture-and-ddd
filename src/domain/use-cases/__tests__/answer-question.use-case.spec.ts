import type { AnswerRepository } from '@/domain/repositories/answer.repository';
import { expect, test, vi } from 'vitest';
import { AnswerQuestionUseCase } from '../answer-question.use-case';

const fakeAnswerRepository: AnswerRepository = {
	create: vi.fn(),
};

test('should create an answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

	const answer = await answerQuestion.execute({
		authorId: 'author-id',
		questionId: 'question-id',
		answerContent: 'answer content',
	});

	expect(answer.content).toBe('answer content');
});
