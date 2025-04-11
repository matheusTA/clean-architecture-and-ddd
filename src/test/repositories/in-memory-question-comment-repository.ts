import type { PaginationParams } from '@/core/types/pagination-params';
import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

export class InMemoryQuestionCommentRepository
	implements QuestionCommentRepository
{
	public questionComments: QuestionComment[] = [];

	async findById(id: string): Promise<QuestionComment | null> {
		const questionComment = this.questionComments.find(
			(questionComment) => questionComment.id.toString() === id,
		);

		if (!questionComment) {
			return null;
		}

		return questionComment;
	}

	async findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<QuestionComment[]> {
		const questionComments = this.questionComments
			.filter(
				(questionComment) =>
					questionComment.questionId.toString() === questionId,
			)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
			.slice((params.page - 1) * 20, params.page * 20);

		return questionComments;
	}

	async create(questionComment: QuestionComment): Promise<void> {
		this.questionComments.push(questionComment);
	}

	async delete(questionComment: QuestionComment): Promise<void> {
		const questionCommentDeletedIndex = this.questionComments.findIndex(
			(item) => item.id === questionComment.id,
		);

		this.questionComments.splice(questionCommentDeletedIndex, 1);
	}
}
