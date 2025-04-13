import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

type CommentOnAnswerUseCaseInput = {
	answerId: string;
	authorId: string;
	content: string;
};

type CommentOnAnswerUseCaseOutputSuccess = {
	answerComment: AnswerComment;
};

type CommentOnAnswerUseCaseoutputError = ResourceNotFoundError;

type CommentOnAnswerUseCaseOutput = Either<
	CommentOnAnswerUseCaseoutputError,
	CommentOnAnswerUseCaseOutputSuccess
>;

export class CommentOnAnswerUseCase {
	constructor(
		private answerRepository: AnswerRepository,
		private answerCommentRepository: AnswerCommentRepository,
	) {}

	async execute({
		answerId,
		authorId,
		content,
	}: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseOutput> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = AnswerComment.build({
			answerId: new UniqueEntityID(answerId),
			authorId: new UniqueEntityID(authorId),
			content,
		});

		await this.answerCommentRepository.create(answerComment);

		return right({
			answerComment,
		});
	}
}
