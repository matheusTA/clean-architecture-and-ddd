import { type Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { NotificationRepository } from '@/domain/notification/application/repositories/notification.repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification.entity';

type SendNotificationUseCaseInput = {
	recipientId: string;
	title: string;
	content: string;
};

type SendNotificationUseCaseOutputSuccess = {
	notification: Notification;
};

type SendNotificationUseCaseoutputError = null;

type SendNotificationUseCaseOutput = Either<
	SendNotificationUseCaseoutputError,
	SendNotificationUseCaseOutputSuccess
>;
export class SendNotificationUseCase {
	constructor(private notificationRepository: NotificationRepository) {}

	async execute({
		recipientId,
		title,
		content,
	}: SendNotificationUseCaseInput): Promise<SendNotificationUseCaseOutput> {
		const notification = Notification.build({
			recipientId: new UniqueEntityID(recipientId),
			title,
			content,
		});

		await this.notificationRepository.create(notification);

		return right({
			notification,
		});
	}
}
