import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repositoru';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { waitFor } from '@/test/utils/wait-for';
import type { MockInstance } from 'vitest';

let inMemoryQuestionsRepository: InMemoryQuestionRepository;
let inMemoryAnswersRepository: InMemoryAnswerRepository;
let inMemoryNotificationsRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;
let sendNotificationExecuteSpy: MockInstance;

describe('On Question Best Answer Chosen', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionRepository();
		inMemoryAnswersRepository = new InMemoryAnswerRepository();
		inMemoryNotificationsRepository = new InMemoryNotificationRepository();

		sendNotificationUseCase = new SendNotificationUseCase(
			inMemoryNotificationsRepository,
		);

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnQuestionBestAnswerChosen(
			inMemoryAnswersRepository,

			sendNotificationUseCase,
		);
	});

	it('should send a notification when topic has new best answer chosen', async () => {
		const question = makeQuestion();

		const answer = makeAnswer({ questionId: question.id });

		inMemoryQuestionsRepository.create(question);

		inMemoryAnswersRepository.create(answer);

		question.bestAnswerId = answer.id;

		inMemoryQuestionsRepository.save(question);

		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled();
		});
	});
});
