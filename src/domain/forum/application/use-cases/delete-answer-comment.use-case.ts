import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

interface DeleteAnswerCommentUseCaseInput {
	answerCommentId: string;
	authorId: string;
}

interface DeleteAnswerCommentUseCaseOutput {
	answerComment: AnswerComment;
}

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentRepository: AnswerCommentRepository) {}

	async execute({
		answerCommentId,
		authorId,
	}: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseOutput> {
		const answerComment =
			await this.answerCommentRepository.findById(answerCommentId);

		if (!answerComment) {
			throw new Error('Answer comment not found.');
		}

		if (answerComment.authorId.toString() !== authorId) {
			throw new Error('Not allowed.');
		}

		await this.answerCommentRepository.delete(answerComment);

		return {
			answerComment,
		};
	}
}
