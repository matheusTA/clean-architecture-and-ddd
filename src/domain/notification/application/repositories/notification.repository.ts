import type { Notification } from '@/domain/notification/enterprise/entities/notification.entity';

export interface NotificationRepository {
	create(notification: Notification): Promise<void>;
}
