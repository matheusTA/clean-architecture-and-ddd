import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

export class InMemoryAnswerRepository implements AnswerRepository {
	private answers: Answer[] = [];

	async create(answer: Answer): Promise<void> {
		this.answers.push(answer);
	}
}
