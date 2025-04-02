import type { PaginationParams } from '@/core/types/pagination-params';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

export interface AnswerRepository {
	findById(id: string): Promise<Answer | null>;
	findManyByQuestionId(
		questionId: string,
		params: PaginationParams,
	): Promise<Answer[]>;
	save(answer: Answer): Promise<void>;
	create(answer: Answer): Promise<void>;
	delete(answer: Answer): Promise<void>;
}
