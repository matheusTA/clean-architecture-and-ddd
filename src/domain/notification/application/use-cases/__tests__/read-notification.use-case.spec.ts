import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification.use-case';
import { makeNotification } from '@/test/factories/make-notification';
import { InMemoryNotificationRepository } from '@/test/repositories/in-memory-notification-repositoru';
import { expect } from 'vitest';

let repository: InMemoryNotificationRepository;
let useCase: ReadNotificationUseCase;

describe('read notification use case', () => {
	beforeEach(() => {
		repository = new InMemoryNotificationRepository();
		useCase = new ReadNotificationUseCase(repository);
	});

	it('should read a notification', async () => {
		const notification = makeNotification();

		await repository.create(notification);

		const result = await useCase.execute({
			recipientId: notification.recipientId.toString(),
			notificationId: notification.id.toString(),
		});

		expect(result.isRight()).toBe(true);
		expect(repository.notifications[0].readAt).toEqual(expect.any(Date));
	});

	it('should not be able to read a notification from another user', async () => {
		const notification = makeNotification();

		await repository.create(notification);

		const result = await useCase.execute({
			recipientId: 'another-user-id',
			notificationId: notification.id.toString(),
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});

	it('should not be able to read a non existing notification', async () => {
		const result = await useCase.execute({
			recipientId: 'recipient-id',
			notificationId: 'non-existing-notification-id',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});
});
