import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AnswerAttachmentProps {
	answerId: UniqueEntityID;
	attachmentId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
	static build(props: AnswerAttachmentProps, id?: UniqueEntityID) {
		const answerAttachment = new AnswerAttachment(props, id);

		return answerAttachment;
	}

	get answerId() {
		return this.props.answerId;
	}

	get attachmentId() {
		return this.props.attachmentId;
	}

	set answerId(answerId: UniqueEntityID) {
		this.props.answerId = answerId;
	}

	set attachmentId(attachmentId: UniqueEntityID) {
		this.props.attachmentId = attachmentId;
	}
}
