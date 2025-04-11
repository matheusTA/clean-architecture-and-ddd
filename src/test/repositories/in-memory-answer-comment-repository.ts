import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

export class InMemoryAnswerCommentRepository
	implements AnswerCommentRepository
{
	public answerComments: AnswerComment[] = [];

	async create(answerComment: AnswerComment): Promise<void> {
		this.answerComments.push(answerComment);
	}
}
