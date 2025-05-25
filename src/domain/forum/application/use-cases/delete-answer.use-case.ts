import { type Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import type { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment.repository';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';
type DeleteAnswerUseCaseInput = {
	authorId: string;
	answerId: string;
};

type DeleteAnswerUseCaseOutputSuccess = {
	answer: Answer;
};

type DeleteAnswerUseCaseoutputError = ResourceNotFoundError | NotAllowedError;

type DeleteAnswerUseCaseOutput = Either<
	DeleteAnswerUseCaseoutputError,
	DeleteAnswerUseCaseOutputSuccess
>;

export class DeleteAnswerUseCase {
	constructor(
		private answerRepository: AnswerRepository,
		private answerAttachmentRepository: AnswerAttachmentRepository,
	) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseOutput> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (answer.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		await this.answerRepository.delete(answer);
		await this.answerAttachmentRepository.deleteManyByAnswerId(
			answer.id.toString(),
		);

		return right({
			answer,
		});
	}
}
