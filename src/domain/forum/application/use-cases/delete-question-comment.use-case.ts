import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

interface DeleteQuestionCommentUseCaseInput {
	questionCommentId: string;
	authorId: string;
}

interface DeleteQuestionCommentUseCaseOutput {
	questionComment: QuestionComment;
}

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentRepository: QuestionCommentRepository) {}

	async execute({
		questionCommentId,
		authorId,
	}: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseOutput> {
		const questionComment =
			await this.questionCommentRepository.findById(questionCommentId);

		if (!questionComment) {
			throw new Error('Question comment not found.');
		}

		if (questionComment.authorId.toString() !== authorId) {
			throw new Error('Not allowed.');
		}

		await this.questionCommentRepository.delete(questionComment);

		return {
			questionComment,
		};
	}
}
