import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer.entity";
import { AnswerRepository } from "../repositories/answer.repository";

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
