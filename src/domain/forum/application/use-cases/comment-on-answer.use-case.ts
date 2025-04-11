import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

interface CommentOnAnswerUseCaseInput {
	answerId: string;
	authorId: string;
	content: string;
}

interface CommentOnAnswerUseCaseOutput {
	answerComment: AnswerComment;
}

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
			throw new Error('Answer not found.');
		}

		const answerComment = AnswerComment.build({
			answerId: new UniqueEntityID(answerId),
			authorId: new UniqueEntityID(authorId),
			content,
		});

		await this.answerCommentRepository.create(answerComment);

		return {
			answerComment,
		};
	}
}
