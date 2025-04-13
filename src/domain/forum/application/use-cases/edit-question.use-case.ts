import { type Either, left, right } from '@/core/either';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

type EditQuestionUseCaseInput = {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
};

type EditQuestionUseCaseOutputSuccess = {
	question: Question;
};

type EditQuestionUseCaseoutputError = ResourceNotFoundError | NotAllowedError;

type EditQuestionUseCaseOutput = Either<
	EditQuestionUseCaseoutputError,
	EditQuestionUseCaseOutputSuccess
>;
export class EditQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		questionId,
		title,
		content,
	}: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseOutput> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (question.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		question.title = title;
		question.content = content;

		await this.questionRepository.save(question);

		return right({
			question,
		});
	}
}
