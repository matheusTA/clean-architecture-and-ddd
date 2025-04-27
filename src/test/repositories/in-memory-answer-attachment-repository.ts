import type { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment.repository';
import type { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.entity';

export class InMemoryAnswerAttachmentRepository
	implements AnswerAttachmentRepository
{
	public answerAttachments: AnswerAttachment[] = [];

	async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
		const answerAttachments = this.answerAttachments.filter(
			(answerAttachment) => answerAttachment.answerId.toString() === answerId,
		);

		return answerAttachments;
	}

	async deleteManyByAnswerId(answerId: string): Promise<void> {
		this.answerAttachments = this.answerAttachments.filter(
			(answerAttachment) => answerAttachment.answerId.toString() !== answerId,
		);
	}
}
