import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export class InMemoryQuestionRepository implements QuestionRepository {
	private questions: Question[] = [];

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
}
