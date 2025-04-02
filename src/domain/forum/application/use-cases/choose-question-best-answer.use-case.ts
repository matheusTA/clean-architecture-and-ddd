import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

interface ChooseQuestionBestAnswerUseCaseInput {
	authorId: string;
	answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseOutput {
	question: Question;
}

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
			throw new Error('Answer not found');
		}

		const question = await this.questionRepository.findById(
			answer.questionId.toString(),
		);

		if (!question) {
			throw new Error('Question not found');
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error('Unauthorized');
		}

		question.bestAnswerId = answer.id;

		await this.questionRepository.save(question);

		return {
			question,
		};
	}
}
