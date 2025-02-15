import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { Question } from '@/domain/forum/enterprise/entities/question.entity';

interface CreateQuestionUseCaseInput {
	authorId: string;
	title: string;
	content: string;
}

interface CreateQuestionUseCaseOutput {
	question: Question;
}

export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		title,
		content,
	}: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
		const question = Question.build({
			authorId: new UniqueEntityID(authorId),
			title,
			content,
		});

		await this.questionRepository.create(question);

		return {
			question,
		};
	}
}
