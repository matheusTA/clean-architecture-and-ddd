import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification.use-case';
import { makeAnswer } from '@/test/factories/make-answer';
import { makeQuestion } from '@/test/factories/make-question';
import { InMemoryAnswerRepository } from '@/test/repositories/in-memory-answer-repository';
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repositoru';
import { InMemoryQuestionRepository } from '@/test/repositories/in-memory-question-repository';
import { waitFor } from '@/test/utils/wait-for';
import type { MockInstance } from 'vitest';

let questionsRepository: InMemoryQuestionRepository;
let answersRepository: InMemoryAnswerRepository;
let notificationsRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance;

describe('On Answer Created', () => {
	beforeEach(() => {
		questionsRepository = new InMemoryQuestionRepository();

		answersRepository = new InMemoryAnswerRepository();

		notificationsRepository = new InMemoryNotificationRepository();
		sendNotificationUseCase = new SendNotificationUseCase(
			notificationsRepository,
		);

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnAnswerCreated(questionsRepository, sendNotificationUseCase);
	});

	it('should send a notification when an answer is created', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({ questionId: question.id });

		await questionsRepository.create(question);
		await answersRepository.create(answer);

		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled();
		});
	});
});
