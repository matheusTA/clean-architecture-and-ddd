import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';

interface DeleteAnswerUseCaseInput {
	authorId: string;
	answerId: string;
}

export class DeleteAnswerUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseInput): Promise<void> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			throw new Error('Answer not found');
		}

		if (answer.authorId.toString() !== authorId) {
			throw new Error('Unauthorized');
		}

		await this.answerRepository.delete(answer);
	}
}
