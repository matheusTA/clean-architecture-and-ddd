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
