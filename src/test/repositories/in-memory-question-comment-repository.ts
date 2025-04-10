import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

export class InMemoryQuestionCommentRepository
	implements QuestionCommentRepository
{
	public questionComments: QuestionComment[] = [];

	async create(questionComment: QuestionComment): Promise<void> {
		this.questionComments.push(questionComment);
	}
}
