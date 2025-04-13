import { type Either, right } from '@/core/either';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

type ListRecentQuestionsUseCaseInput = {
	page: number;
};

type ListRecentQuestionsUseCaseOutputSuccess = {
	questions: Question[];
};

type ListRecentQuestionsUseCaseOutputError = null;

type ListRecentQuestionsUseCaseOutput = Either<
	ListRecentQuestionsUseCaseOutputError,
	ListRecentQuestionsUseCaseOutputSuccess
>;
export class ListRecentQuestionsUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		page,
	}: ListRecentQuestionsUseCaseInput): Promise<ListRecentQuestionsUseCaseOutput> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return right({
			questions,
		});
	}
}
