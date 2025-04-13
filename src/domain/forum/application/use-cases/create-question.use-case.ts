import { type Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { Question } from '@/domain/forum/enterprise/entities/question.entity';

type CreateQuestionUseCaseInput = {
	authorId: string;
	title: string;
	content: string;
};

type CreateQuestionUseCaseOutputSuccess = {
	question: Question;
};

type CreateQuestionUseCaseoutputError = null;

type CreateQuestionUseCaseOutput = Either<
	CreateQuestionUseCaseoutputError,
	CreateQuestionUseCaseOutputSuccess
>;
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

		return right({
			question,
		});
	}
}
