import { Answer } from "../entities/answer.entity";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
}
