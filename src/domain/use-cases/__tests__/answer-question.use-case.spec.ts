import { expect, test, vi } from "vitest";
import { AnswerQuestionUseCase } from "../answer-question.use-case";
import { AnswerRepository } from "../../repositories/answer.repository";

const fakeAnswerRepository: AnswerRepository = {
  create: vi.fn(),
};

test("should create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    instructorId: "instructor-id",
    questionId: "question-id",
    answerContent: "answer content",
  });

  expect(answer.content).toBe("answer content");
});
