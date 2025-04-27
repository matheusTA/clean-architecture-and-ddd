import type { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.entity';

export interface AnswerAttachmentRepository {
	findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
	deleteManyByAnswerId(answerId: string): Promise<void>;
}
