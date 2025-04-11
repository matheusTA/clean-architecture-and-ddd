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
