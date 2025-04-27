import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	AnswerAttachment,
	type AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment.entity';

export function makeAnswerAttachment(
	overrides: Partial<AnswerAttachmentProps> = {},
	id?: UniqueEntityID,
): AnswerAttachment {
	const answerAttachment = AnswerAttachment.build(
		{
			answerId: new UniqueEntityID(),
			attachmentId: new UniqueEntityID(),
			...overrides,
		},
		id,
	);

	return answerAttachment;
}
