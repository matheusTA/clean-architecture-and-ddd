import { Answer } from "../entities/answer.entity";
import { AnswerRepository } from "../repositories/answer.repository";

interface AnswerQuestionUseCaseInput {
  instructorId: string;
  questionId: string;
  answerContent: string;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    answerContent,
  }: AnswerQuestionUseCaseInput) {
    const answer = new Answer({
      content: answerContent,
      authorId: instructorId,
      questionId,
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}
