import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

type CommentOnQuestionUseCaseInput = {
	questionId: string;
	authorId: string;
	content: string;
};

type CommentOnQuestionUseCaseOutputSuccess = {
	questionComment: QuestionComment;
};

type CommentOnQuestionUseCaseoutputError = ResourceNotFoundError;

type CommentOnQuestionUseCaseOutput = Either<
	CommentOnQuestionUseCaseoutputError,
	CommentOnQuestionUseCaseOutputSuccess
>;

export class CommentOnQuestionUseCase {
	constructor(
		private questionRepository: QuestionRepository,
		private questionCommentRepository: QuestionCommentRepository,
	) {}

	async execute({
		questionId,
		authorId,
		content,
	}: CommentOnQuestionUseCaseInput): Promise<CommentOnQuestionUseCaseOutput> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		const questionComment = QuestionComment.build({
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
			content,
		});

		await this.questionCommentRepository.create(questionComment);

		return right({
			questionComment,
		});
	}
}
