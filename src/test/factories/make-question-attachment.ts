import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	QuestionAttachment,
	type QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment.entity';

export function makeQuestionAttachment(
	overrides: Partial<QuestionAttachmentProps> = {},
	id?: UniqueEntityID,
): QuestionAttachment {
	const questionAttachment = QuestionAttachment.build(
		{
			questionId: new UniqueEntityID(),
			attachmentId: new UniqueEntityID(),
			...overrides,
		},
		id,
	);

	return questionAttachment;
}
