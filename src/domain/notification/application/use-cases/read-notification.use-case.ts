import { type Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';
import type { NotificationRepository } from '@/domain/notification/application/repositories/notification.repository';
import type { Notification } from '@/domain/notification/enterprise/entities/notification.entity';

type ReadNotificationUseCaseInput = {
	notificationId: string;
	recipientId: string;
};

type ReadNotificationUseCaseOutputSuccess = {
	notification: Notification;
};

type ReadNotificationUseCaseoutputError =
	| ResourceNotFoundError
	| NotAllowedError;

type ReadNotificationUseCaseOutput = Either<
	ReadNotificationUseCaseoutputError,
	ReadNotificationUseCaseOutputSuccess
>;
export class ReadNotificationUseCase {
	constructor(private notificationRepository: NotificationRepository) {}

	async execute({
		notificationId,
		recipientId,
	}: ReadNotificationUseCaseInput): Promise<ReadNotificationUseCaseOutput> {
		const notification =
			await this.notificationRepository.findById(notificationId);

		if (!notification) {
			return left(new ResourceNotFoundError());
		}

		if (notification.recipientId.toString() !== recipientId) {
			return left(new NotAllowedError());
		}

		notification.read();

		await this.notificationRepository.save(notification);

		return right({
			notification,
		});
	}
}
