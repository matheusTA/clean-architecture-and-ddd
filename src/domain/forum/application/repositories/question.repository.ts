import type { PaginationParams } from '@/core/types/pagination-params';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export interface QuestionRepository {
	findById(id: string): Promise<Question | null>;
	findBySlug(slug: string): Promise<Question | null>;
	findManyRecent(params: PaginationParams): Promise<Question[]>;
	save(question: Question): Promise<void>;
	create(question: Question): Promise<void>;
	delete(question: Question): Promise<void>;
}
