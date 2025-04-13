import { type Either, left, right } from '@/core/either';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

type EditAnswerUseCaseInput = {
	authorId: string;
	answerId: string;
	content: string;
};

type EditAnswerUseCaseOutputSuccess = {
	answer: Answer;
};

type EditAnswerUseCaseoutputError = ResourceNotFoundError | NotAllowedError;

type EditAnswerUseCaseOutput = Either<
	EditAnswerUseCaseoutputError,
	EditAnswerUseCaseOutputSuccess
>;
export class EditAnswerUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		authorId,
		answerId,
		content,
	}: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (answer.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		answer.content = content;

		await this.answerRepository.save(answer);

		return right({
			answer,
		});
	}
}
