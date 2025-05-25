import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Notification,
	type NotificationProps,
} from '@/domain/notification/enterprise/entities/notification.entity';
import { faker } from '@faker-js/faker';

export function makeNotification(
	overrides: Partial<NotificationProps> = {},
	id?: UniqueEntityID,
): Notification {
	const notification = Notification.build(
		{
			recipientId: new UniqueEntityID(),
			title: faker.lorem.sentence(4),
			content: faker.lorem.sentence(10),
			...overrides,
		},
		id,
	);

	return notification;
}
