import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

interface AnswerQuestionUseCaseInput {
	questionId: string;
	authorId: string;
	answerContent: string;
}

export class AnswerQuestionUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		questionId,
		authorId,
		answerContent,
	}: AnswerQuestionUseCaseInput) {
		const answer = Answer.build({
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
			content: answerContent,
		});

		await this.answerRepository.create(answer);

		return answer;
	}
}
