import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer.use-case';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { expect } from 'vitest';

let questionRepository: InMemoryQuestionRepository;
let answerRepository: InMemoryAnswerRepository;
let useCase: ChooseQuestionBestAnswerUseCase;

describe('choose question best answer use case', () => {
	beforeEach(() => {
		questionRepository = new InMemoryQuestionRepository();
		answerRepository = new InMemoryAnswerRepository();
		useCase = new ChooseQuestionBestAnswerUseCase(
			questionRepository,
			answerRepository,
		);
	});

	it('should be able to choose the best answer for a question', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id,
		});

		await questionRepository.create(question);
		await answerRepository.create(answer);

		const result = await useCase.execute({
			authorId: question.authorId.toString(),
			answerId: answer.id.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(questionRepository.questions[0].bestAnswerId).toEqual(answer.id);
	});

	it('should not be able to choose a non-existent answer as the best answer', async () => {
		const question = makeQuestion();
		await questionRepository.create(question);

		const result = await useCase.execute({
			authorId: question.authorId.toString(),
			answerId: 'non-existent-answer-id',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to choose the best answer for a non-existent question', async () => {
		const answer = makeAnswer();
		await answerRepository.create(answer);

		const result = await useCase.execute({
			authorId: 'any-author-id',
			answerId: answer.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to choose the best answer if the user is not the question author', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id,
		});

		await questionRepository.create(question);
		await answerRepository.create(answer);

		const result = await useCase.execute({
			authorId: 'wrong-author-id',
			answerId: answer.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
