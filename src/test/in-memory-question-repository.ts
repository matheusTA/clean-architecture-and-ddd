import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

export class InMemoryQuestionRepository implements QuestionRepository {
	private questions: Question[] = [];

	async create(question: Question): Promise<void> {
		this.questions.push(question);
	}
}
