import { AggregateRoot } from '@/core/entities/aggregate-root';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.entity';
import dayjs from 'dayjs';
import { Slug } from './value-objects/slug.value-object';

export interface QuestionProps {
	createdAt: Date;
	updatedAt?: Date;
	authorId: UniqueEntityID;
	title: string;
	content: string;
	slug: Slug;
	attachments: QuestionAttachment[];
	bestAnswerId?: UniqueEntityID;
}

export class Question extends AggregateRoot<QuestionProps> {
	static build(
		props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
		id?: UniqueEntityID,
	) {
		const question = new Question(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				slug: props.slug ?? Slug.createFromText(props.title),
				attachments: props.attachments ?? [],
			},
			id,
		);

		return question;
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

	get authorId() {
		return this.props.authorId;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get slug() {
		return this.props.slug;
	}

	get attachments() {
		return this.props.attachments;
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	get isNew() {
		return dayjs().diff(this.props.createdAt, 'days') <= 3;
	}

	get excerpt() {
		return this.props.content.substring(0, 120).trimEnd().concat('...');
	}

	set title(value: string) {
		this.props.title = value;
		this.props.slug = Slug.createFromText(value);
		this.touch();
	}

	set content(value: string) {
		this.props.content = value;
		this.touch();
	}

	set bestAnswerId(value: UniqueEntityID | undefined) {
		this.props.bestAnswerId = value;
		this.touch();
	}

	set attachments(attachments: QuestionAttachment[]) {
		this.props.attachments = attachments;
	}
}
