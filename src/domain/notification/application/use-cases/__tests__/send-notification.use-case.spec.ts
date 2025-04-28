import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification.use-case';
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repositoru';
import { expect } from 'vitest';

let repository: InMemoryNotificationRepository;
let useCase: SendNotificationUseCase;

describe('send notification use case', () => {
	beforeEach(() => {
		repository = new InMemoryNotificationRepository();
		useCase = new SendNotificationUseCase(repository);
	});

	it('should send a notification', async () => {
		const result = await useCase.execute({
			recipientId: 'recipient-id',
			title: 'notification title',
			content: 'notification content',
		});

		expect(result.isRight()).toBe(true);
		expect(result.value?.notification.id).toBeTruthy();
	});
});
