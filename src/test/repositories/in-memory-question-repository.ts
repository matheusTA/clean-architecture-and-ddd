import type { PaginationParams } from '@/core/types/pagination-params';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export class InMemoryQuestionRepository implements QuestionRepository {
	public questions: Question[] = [];

	async findById(id: string): Promise<Question | null> {
		const question = this.questions.find(
			(question) => question.id.toString() === id,
		);

		if (!question) {
			return null;
		}

		return question;
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.questions.find(
			(question) => question.slug.value === slug,
		);

		if (!question) {
			return null;
		}

		return question;
	}

	async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
		const questions = this.questions
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20);

		return questions;
	}

	async save(question: Question): Promise<void> {
		const questionDeletedIndex = this.questions.findIndex(
			(item) => item.id === question.id,
		);

		this.questions[questionDeletedIndex] = question;
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
