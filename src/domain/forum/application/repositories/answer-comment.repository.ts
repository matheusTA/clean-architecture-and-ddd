import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

export interface AnswerCommentRepository {
	create(answerComment: AnswerComment): Promise<void>;
}
