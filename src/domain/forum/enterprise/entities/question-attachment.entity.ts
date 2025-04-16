import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface QuestionAttachmentProps {
	questionId: UniqueEntityID;
	attachmentId: UniqueEntityID;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
	static build(props: QuestionAttachmentProps, id?: UniqueEntityID) {
		const questionAttachment = new QuestionAttachment(props, id);

		return questionAttachment;
	}

	get questionId() {
		return this.props.questionId;
	}

	get attachmentId() {
		return this.props.attachmentId;
	}

	set questionId(questionId: UniqueEntityID) {
		this.props.questionId = questionId;
	}

	set attachmentId(attachmentId: UniqueEntityID) {
		this.props.attachmentId = attachmentId;
	}
}
