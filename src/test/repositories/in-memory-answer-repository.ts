import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

export class InMemoryAnswerRepository implements AnswerRepository {
	public answers: Answer[] = [];

	async getById(id: string): Promise<Answer | null> {
		const answer = this.answers.find((answer) => answer.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async save(answer: Answer): Promise<void> {
		const answerIndex = this.answers.findIndex((item) => item.id === answer.id);

		this.answers[answerIndex] = answer;
	}

	async create(answer: Answer): Promise<void> {
		this.answers.push(answer);
	}

	async delete(answer: Answer): Promise<void> {
		const answerDeletedIndex = this.answers.findIndex(
			(item) => item.id === answer.id,
		);

		this.answers.splice(answerDeletedIndex, 1);
	}
}
