import { type Either, left, right } from '@/core/either';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

type ChooseQuestionBestAnswerUseCaseInput = {
	authorId: string;
	answerId: string;
};

type ChooseQuestionBestAnswerUseCaseOutputSuccess = {
	question: Question;
};

type ChooseQuestionBestAnswerUseCaseoutputError =
	| ResourceNotFoundError
	| NotAllowedError;

type ChooseQuestionBestAnswerUseCaseOutput = Either<
	ChooseQuestionBestAnswerUseCaseoutputError,
	ChooseQuestionBestAnswerUseCaseOutputSuccess
>;

export class ChooseQuestionBestAnswerUseCase {
	constructor(
		private questionRepository: QuestionRepository,
		private answerRepository: AnswerRepository,
	) {}

	async execute({
		authorId,
		answerId,
	}: ChooseQuestionBestAnswerUseCaseInput): Promise<ChooseQuestionBestAnswerUseCaseOutput> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const question = await this.questionRepository.findById(
			answer.questionId.toString(),
		);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionRepository.save(question);

		return right({
			question,
		});
	}
}
