import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';

interface DeleteQuestionUseCaseInput {
	authorId: string;
	questionId: string;
}

export class DeleteQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		questionId,
	}: DeleteQuestionUseCaseInput): Promise<void> {
		const question = await this.questionRepository.getById(questionId);

		if (!question) {
			throw new Error('Question not found');
		}

		if (question.authorId.toString() !== authorId) {
			throw new Error('Unauthorized');
		}

		await this.questionRepository.delete(question);
	}
}
