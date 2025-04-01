import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

interface EditAnswerUseCaseInput {
	authorId: string;
	answerId: string;
	content: string;
}

interface EditAnswerUseCaseOutput {
	answer: Answer;
}

export class EditAnswerUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
		const answer = await this.answerRepository.getById(answerId);

		if (!answer) {
			throw new Error('Answer not found');
		}

		if (answer.authorId.toString() !== authorId) {
			throw new Error('Unauthorized');
		}

		answer.content = content;

		await this.answerRepository.save(answer);

		return {
			answer,
		};
	}
}
