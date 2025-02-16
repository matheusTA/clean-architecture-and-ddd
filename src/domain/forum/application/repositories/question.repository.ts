import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export interface QuestionRepository {
	getById(id: string): Promise<Question | null>;
	getBySlug(slug: string): Promise<Question | null>;
	create(question: Question): Promise<void>;
	delete(question: Question): Promise<void>;
}
