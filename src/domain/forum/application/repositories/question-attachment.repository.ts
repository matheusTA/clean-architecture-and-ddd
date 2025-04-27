import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.entity';

export interface QuestionAttachmentRepository {
	findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
	deleteManyByQuestionId(questionId: string): Promise<void>;
}
