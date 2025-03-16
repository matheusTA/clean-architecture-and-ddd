import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';

interface EditQuestionUseCaseInput {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
}

export class EditQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		questionId,
		title,
		content,
	}: EditQuestionUseCaseInput): Promise<void> {
		const question = await this.questionRepository.getById(questionId);

		if (!question) {
			throw new Error('Question not found');
		}

		if (question.authorId.toString() !== authorId) {
			throw new Error('Unauthorized');
		}

		question.title = title;
		question.content = content;

		await this.questionRepository.save(question);
	}
}
