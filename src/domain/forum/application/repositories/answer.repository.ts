import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

export interface AnswerRepository {
	create(answer: Answer): Promise<void>;
}
