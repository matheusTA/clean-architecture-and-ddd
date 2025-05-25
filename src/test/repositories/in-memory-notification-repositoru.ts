import type { NotificationRepository } from '@/domain/notification/application/repositories/notification.repository';
import type { Notification } from '@/domain/notification/enterprise/entities/notification.entity';

export class InMemoryNotificationRepository implements NotificationRepository {
	public notifications: Notification[] = [];

	async findById(id: string): Promise<Notification | null> {
		const notification = this.notifications.find(
			(notification) => notification.id.toString() === id,
		);

		return notification ?? null;
	}

	async create(notification: Notification): Promise<void> {
		this.notifications.push(notification);
	}

	async save(notification: Notification): Promise<void> {
		const notificationIndex = this.notifications.findIndex(
			(item) => item.id === notification.id,
		);

		this.notifications[notificationIndex] = notification;
	}
}
