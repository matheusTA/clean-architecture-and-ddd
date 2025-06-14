import { type Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import type { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment.repository';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
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
	constructor(
		private questionRepository: QuestionRepository,
		private questionAttachmentRepository: QuestionAttachmentRepository,
	) {}

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
		await this.questionAttachmentRepository.deleteManyByQuestionId(
			question.id.toString(),
		);

		return right({
			question,
		});
	}
}
