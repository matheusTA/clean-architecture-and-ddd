import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

export interface AnswerCommentRepository {
	findById(id: string): Promise<AnswerComment | null>;
	create(answerComment: AnswerComment): Promise<void>;
	delete(answerComment: AnswerComment): Promise<void>;
}
