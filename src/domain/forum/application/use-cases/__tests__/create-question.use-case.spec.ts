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
		const { value, isRight } = await useCase.execute({
			authorId: 'author-id',
			title: 'question title',
			content: 'answer content',
			attachmentsIds: ['attachment-id-1', 'attachment-id-2'],
		});

		expect(isRight()).toBe(true);
		expect(value?.question.id).toBeTruthy();
		expect(value?.question.attachments.length).toBe(2);
		expect(value?.question.attachments[0].attachmentId.toString()).toBe(
			'attachment-id-1',
		);
		expect(value?.question.attachments[1].attachmentId.toString()).toBe(
			'attachment-id-2',
		);
	});
});
