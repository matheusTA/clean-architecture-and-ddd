import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export interface QuestionRepository {
	create(question: Question): Promise<void>;
}
