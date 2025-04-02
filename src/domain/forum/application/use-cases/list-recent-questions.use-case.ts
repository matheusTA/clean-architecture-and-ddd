import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

interface ListRecentQuestionsUseCaseInput {
	page: number;
}

interface ListRecentQuestionsUseCaseOutput {
	questions: Question[];
}

export class ListRecentQuestionsUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		page,
	}: ListRecentQuestionsUseCaseInput): Promise<ListRecentQuestionsUseCaseOutput> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return {
			questions,
		};
	}
}
