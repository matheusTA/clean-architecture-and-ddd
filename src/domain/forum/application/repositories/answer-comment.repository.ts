import type { PaginationParams } from '@/core/types/pagination-params';
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';

export interface AnswerCommentRepository {
	findById(id: string): Promise<AnswerComment | null>;
	findManyByAnswerId(
		answerId: string,
		params: PaginationParams,
	): Promise<AnswerComment[]>;
	create(answerComment: AnswerComment): Promise<void>;
	delete(answerComment: AnswerComment): Promise<void>;
}
