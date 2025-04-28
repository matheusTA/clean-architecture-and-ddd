import type { NotificationRepository } from '@/domain/notification/application/repositories/notification.repository';
import type { Notification } from '@/domain/notification/enterprise/entities/notification.entity';

export class InMemoryNotificationRepository implements NotificationRepository {
	public notifications: Notification[] = [];

	async create(notification: Notification): Promise<void> {
		this.notifications.push(notification);
	}
}
