import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

interface CommentOnQuestionUseCaseInput {
	questionId: string;
	authorId: string;
	content: string;
}

interface CommentOnQuestionUseCaseOutput {
	questionComment: QuestionComment;
}

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
			throw new Error('Question not found.');
		}

		const questionComment = QuestionComment.build({
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
			content,
		});

		await this.questionCommentRepository.create(questionComment);

		return {
			questionComment,
		};
	}
}
