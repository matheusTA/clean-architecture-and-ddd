import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export interface NotificationProps {
	createdAt: Date;
	recipientId: UniqueEntityID;
	readAt?: Date;
	title: string;
	content: string;
}

export class Notification extends Entity<NotificationProps> {
	static build(
		props: Optional<NotificationProps, 'createdAt'>,
		id?: UniqueEntityID,
	) {
		const notification = new Notification(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return notification;
	}

	get recipientId() {
		return this.props.recipientId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get readAt() {
		return this.props.readAt;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	read() {
		this.props.readAt = new Date();
	}
}
