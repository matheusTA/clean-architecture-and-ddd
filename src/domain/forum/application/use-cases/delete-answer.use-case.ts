import { type Either, left, right } from '@/core/either';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
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
	constructor(private answerRepository: AnswerRepository) {}

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

		return right({
			answer,
		});
	}
}
