import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

export interface QuestionCommentRepository {
	create(questionComment: QuestionComment): Promise<void>;
}
