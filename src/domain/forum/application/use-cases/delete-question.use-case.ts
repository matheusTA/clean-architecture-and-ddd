import { type Either, left, right } from '@/core/either';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

type DeleteQuestionUseCaseInput = {
	authorId: string;
	questionId: string;
};

type DeleteQuestionUseCaseOutputSuccess = {
	question: Question;
};

type DeleteQuestionUseCaseoutputError = ResourceNotFoundError | NotAllowedError;

type DeleteQuestionUseCaseOutput = Either<
	DeleteQuestionUseCaseoutputError,
	DeleteQuestionUseCaseOutputSuccess
>;

export class DeleteQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		questionId,
	}: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseOutput> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (question.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		await this.questionRepository.delete(question);

		return right({
			question,
		});
	}
}
