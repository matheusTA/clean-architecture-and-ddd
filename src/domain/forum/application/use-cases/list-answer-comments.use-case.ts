import { type Either, right } from '@/core/either';
import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

type ListAnswerCommentsUseCaseInput = {
	answerId: string;
	page: number;
};

type ListAnswerCommentsUseCaseOutputSuccess = {
	answerComments: AnswerComment[];
};

type ListAnswerCommentsUseCaseoutputError = null;

type ListAnswerCommentsUseCaseOutput = Either<
	ListAnswerCommentsUseCaseoutputError,
	ListAnswerCommentsUseCaseOutputSuccess
>;

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

		return right({
			answerComments,
		});
	}
}
