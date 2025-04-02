import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

interface ListQuestionAnswersUseCaseInput {
	questionId: string;
	page: number;
}

interface ListQuestionAnswersUseCaseOutput {
	answers: Answer[];
}

export class ListQuestionAnswersUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		questionId,
		page,
	}: ListQuestionAnswersUseCaseInput): Promise<ListQuestionAnswersUseCaseOutput> {
		const answers = await this.answerRepository.findManyByQuestionId(
			questionId,
			{ page },
		);

		return {
			answers,
		};
	}
}
