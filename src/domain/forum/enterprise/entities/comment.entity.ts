import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface CommentProps {
	createdAt: Date;
	updatedAt?: Date;
	authorId: UniqueEntityID;
	content: string;
}

export abstract class Comment<
	Props extends CommentProps,
> extends Entity<Props> {
	private touch() {
		this.props.updatedAt = new Date();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get authorId() {
		return this.props.authorId;
	}

	get content() {
		return this.props.content;
	}

	set content(value: string) {
		this.props.content = value;
		this.touch();
	}
}
