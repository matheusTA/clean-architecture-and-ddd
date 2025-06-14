import { type Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

type DeleteAnswerCommentUseCaseInput = {
	answerCommentId: string;
	authorId: string;
};

type DeleteAnswerCommentUseCaseOutputSuccess = {
	answerComment: AnswerComment;
};

type DeleteAnswerCommentUseCaseoutputError =
	| ResourceNotFoundError
	| NotAllowedError;

type DeleteAnswerCommentUseCaseOutput = Either<
	DeleteAnswerCommentUseCaseoutputError,
	DeleteAnswerCommentUseCaseOutputSuccess
>;

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentRepository: AnswerCommentRepository) {}

	async execute({
		answerCommentId,
		authorId,
	}: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseOutput> {
		const answerComment =
			await this.answerCommentRepository.findById(answerCommentId);

		if (!answerComment) {
			return left(new ResourceNotFoundError());
		}

		if (answerComment.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		await this.answerCommentRepository.delete(answerComment);

		return right({
			answerComment,
		});
	}
}
