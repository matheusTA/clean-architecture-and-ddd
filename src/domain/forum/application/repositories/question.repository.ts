import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export interface QuestionRepository {
	getBySlug(slug: string): Promise<Question | null>;
	create(question: Question): Promise<void>;
}
