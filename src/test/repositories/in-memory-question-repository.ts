import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export class InMemoryQuestionRepository implements QuestionRepository {
	public questions: Question[] = [];

	async getById(id: string): Promise<Question | null> {
		const question = this.questions.find(
			(question) => question.id.toString() === id,
		);

		if (!question) {
			return null;
		}

		return question;
	}

	async getBySlug(slug: string): Promise<Question | null> {
		const question = this.questions.find(
			(question) => question.slug.value === slug,
		);

		if (!question) {
			return null;
		}

		return question;
	}

	async create(question: Question): Promise<void> {
		this.questions.push(question);
	}

	async delete(question: Question): Promise<void> {
		const questionDeletedIndex = this.questions.findIndex(
			(item) => item.id === question.id,
		);

		this.questions.splice(questionDeletedIndex, 1);
	}
}
