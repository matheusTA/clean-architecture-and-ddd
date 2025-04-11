import type { PaginationParams } from '@/core/types/pagination-params';
import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

export class InMemoryAnswerCommentRepository
	implements AnswerCommentRepository
{
	public answerComments: AnswerComment[] = [];

	async findById(id: string): Promise<AnswerComment | null> {
		const answerComment = this.answerComments.find(
			(answerComment) => answerComment.id.toString() === id,
		);

		if (!answerComment) {
			return null;
		}

		return answerComment;
	}

	async findManyByAnswerId(
		answerId: string,
		params: PaginationParams,
	): Promise<AnswerComment[]> {
		const answerComments = this.answerComments
			.filter((answerComment) => answerComment.answerId.toString() === answerId)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
			.slice((params.page - 1) * 20, params.page * 20);

		return answerComments;
	}

	async create(answerComment: AnswerComment): Promise<void> {
		this.answerComments.push(answerComment);
	}

	async delete(answerComment: AnswerComment): Promise<void> {
		const answerCommentDeletedIndex = this.answerComments.findIndex(
			(item) => item.id === answerComment.id,
		);

		this.answerComments.splice(answerCommentDeletedIndex, 1);
	}
}
