import { UniqueEntityID } from '@/core/entities/unique-entity-id';
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
		const result = await useCase.execute({
			authorId: 'author-id',
			title: 'question title',
			content: 'answer content',
			attachmentsIds: ['attachment-id-1', 'attachment-id-2'],
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.question.id).toBeTruthy();
		expect(result.value?.question.attachments.currentItems.length).toBe(2);
		expect(result.value?.question.attachments.currentItems).toEqual([
			expect.objectContaining({
				attachmentId: new UniqueEntityID('attachment-id-1'),
			}),
			expect.objectContaining({
				attachmentId: new UniqueEntityID('attachment-id-2'),
			}),
		]);
	});
});
