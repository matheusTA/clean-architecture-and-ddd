import type { PaginationParams } from '@/core/types/pagination-params';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

export interface QuestionCommentRepository {
	findById(id: string): Promise<QuestionComment | null>;
	findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<QuestionComment[]>;
	create(questionComment: QuestionComment): Promise<void>;
	delete(questionComment: QuestionComment): Promise<void>;
}
