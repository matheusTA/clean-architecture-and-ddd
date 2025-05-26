import { AggregateRoot } from '@/core/entities/aggregate-root';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list.entity';
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created.event';

export interface AnswerProps {
	createdAt: Date;
	updatedAt?: Date;
	content: string;
	authorId: UniqueEntityID;
	questionId: UniqueEntityID;
	attachments: AnswerAttachmentList;
}

export class Answer extends AggregateRoot<AnswerProps> {
	static build(
		props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
		id?: UniqueEntityID,
	) {
		const answer = new Answer(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				attachments: props.attachments ?? new AnswerAttachmentList(),
			},
			id,
		);

		if (!id) {
			answer.addDomainEvent(new AnswerCreatedEvent(answer));
		}

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

	get attachments() {
		return this.props.attachments;
	}

	set content(value: string) {
		this.props.content = value;
		this.touch();
	}

	set attachments(value: AnswerAttachmentList) {
		this.props.attachments = value;
		this.touch();
	}
}
