import { type Either, right } from '@/core/either';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

type ListQuestionAnswersUseCaseInput = {
	questionId: string;
	page: number;
};

type ListQuestionAnswersUseCaseOutputSuccess = {
	answers: Answer[];
};

type ListQuestionAnswersUseCaseoutputError = null;

type ListQuestionAnswersUseCaseOutput = Either<
	ListQuestionAnswersUseCaseoutputError,
	ListQuestionAnswersUseCaseOutputSuccess
>;

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

		return right({
			answers,
		});
	}
}
