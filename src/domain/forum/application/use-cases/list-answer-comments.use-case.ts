import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

interface ListAnswerCommentsUseCaseInput {
	answerId: string;
	page: number;
}

interface ListAnswerCommentsUseCaseOutput {
	answerComments: AnswerComment[];
}

export class ListAnswerCommentsUseCase {
	constructor(private answerCommentRepository: AnswerCommentRepository) {}

	async execute({
		answerId,
		page,
	}: ListAnswerCommentsUseCaseInput): Promise<ListAnswerCommentsUseCaseOutput> {
		const answerComments =
			await this.answerCommentRepository.findManyByAnswerId(answerId, {
				page,
			});

		return {
			answerComments,
		};
	}
}
