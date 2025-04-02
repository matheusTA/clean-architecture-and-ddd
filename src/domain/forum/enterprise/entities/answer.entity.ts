import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export interface AnswerProps {
	createdAt: Date;
	updatedAt?: Date;
	content: string;
	authorId: UniqueEntityID;
	questionId: UniqueEntityID;
}

export class Answer extends Entity<AnswerProps> {
	static build(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {
		const answer = new Answer(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answer;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get content() {
		return this.props.content;
	}

	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get excerpt() {
		return this.props.content.substring(0, 120).trimEnd().concat('...');
	}

	set content(value: string) {
		this.props.content = value;
		this.touch();
	}
}
