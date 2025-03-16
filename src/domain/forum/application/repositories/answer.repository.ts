import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

export interface AnswerRepository {
	getById(id: string): Promise<Answer | null>;
	create(answer: Answer): Promise<void>;
	delete(answer: Answer): Promise<void>;
}
