import { UniqueEntityID } from '@/core/entities/unique-entity-id';
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
		const result = await useCase.execute({
			authorId: 'author-id',
			questionId: 'question-id',
			answerContent: 'answer content',
			attachmentsIds: ['attachment-id-1', 'attachment-id-2'],
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.answer.content).toBe('answer content');
		expect(result.value?.answer.attachments.currentItems.length).toBe(2);
		expect(result.value?.answer.attachments.currentItems).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueEntityID('attachment-id-1'),
			}),
			expect.objectContaining({
				attachmentId: new UniqueEntityID('attachment-id-2'),
			}),
		]);
	});
});
