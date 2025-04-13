import type { PaginationParams } from '@/core/types/pagination-params';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';
export class InMemoryAnswerRepository implements AnswerRepository {
	public answers: Answer[] = [];

	async findById(id: string): Promise<Answer | null> {
		const answer = this.answers.find((answer) => answer.id.toString() === id);

		if (!answer) {
			return null;
		}

		return answer;
	}

	async findManyByQuestionId(
		questionId: string,
		{ page }: PaginationParams,
	): Promise<Answer[]> {
		const answers = this.answers
			.filter((answer) => answer.questionId.toString() === questionId)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
			.slice((page - 1) * 20, page * 20);

		return answers;
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
