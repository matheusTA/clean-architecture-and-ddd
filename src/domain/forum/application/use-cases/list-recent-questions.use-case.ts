import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

interface ListRecentQuestionsCaseInput {
	page: number;
}

interface ListRecentQuestionsCaseOutput {
	questions: Question[];
}

export class ListRecentQuestionsCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		page,
	}: ListRecentQuestionsCaseInput): Promise<ListRecentQuestionsCaseOutput> {
		const questions = await this.questionRepository.findManyRecent({ page });

		return {
			questions,
		};
	}
}
