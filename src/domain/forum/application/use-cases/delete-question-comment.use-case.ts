import { type Either, left, right } from '@/core/either';
import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

type DeleteQuestionCommentUseCaseInput = {
	questionCommentId: string;
	authorId: string;
};

type DeleteQuestionCommentUseCaseOutputSuccess = {
	questionComment: QuestionComment;
};

type DeleteQuestionCommentUseCaseoutputError =
	| ResourceNotFoundError
	| NotAllowedError;

type DeleteQuestionCommentUseCaseOutput = Either<
	DeleteQuestionCommentUseCaseoutputError,
	DeleteQuestionCommentUseCaseOutputSuccess
>;

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentRepository: QuestionCommentRepository) {}

	async execute({
		questionCommentId,
		authorId,
	}: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseOutput> {
		const questionComment =
			await this.questionCommentRepository.findById(questionCommentId);

		if (!questionComment) {
			return left(new ResourceNotFoundError());
		}

		if (questionComment.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		await this.questionCommentRepository.delete(questionComment);

		return right({
			questionComment,
		});
	}
}
