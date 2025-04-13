import { type Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

type AnswerQuestionUseCaseInput = {
	questionId: string;
	authorId: string;
	answerContent: string;
};

type AnswerQuestionUseCaseOutputSuccess = {
	answer: Answer;
};

type AnswerQuestionUseCaseoutputError = null;

type AnswerQuestionUseCaseOutput = Either<
	AnswerQuestionUseCaseoutputError,
	AnswerQuestionUseCaseOutputSuccess
>;

export class AnswerQuestionUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		questionId,
		authorId,
		answerContent,
	}: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput> {
		const answer = Answer.build({
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
			content: answerContent,
		});

		await this.answerRepository.create(answer);

		return right({ answer });
	}
}
