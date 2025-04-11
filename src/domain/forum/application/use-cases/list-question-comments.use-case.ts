import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

interface ListQuestionCommentsUseCaseInput {
	questionId: string;
	page: number;
}

interface ListQuestionCommentsUseCaseOutput {
	questionComments: QuestionComment[];
}

export class ListQuestionCommentsUseCase {
	constructor(private questionCommentRepository: QuestionCommentRepository) {}

	async execute({
		questionId,
		page,
	}: ListQuestionCommentsUseCaseInput): Promise<ListQuestionCommentsUseCaseOutput> {
		const questionComments =
			await this.questionCommentRepository.findManyByQuestionId(questionId, {
				page,
			});

		return {
			questionComments,
		};
	}
}
