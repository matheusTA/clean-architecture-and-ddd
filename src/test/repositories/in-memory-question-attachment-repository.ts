import type { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment.repository';
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.entity';

export class InMemoryQuestionAttachmentRepository
	implements QuestionAttachmentRepository
{
	public questionAttachments: QuestionAttachment[] = [];

	async findManyByQuestionId(
		questionId: string,
	): Promise<QuestionAttachment[]> {
		const questionAttachments = this.questionAttachments.filter(
			(questionAttachment) =>
				questionAttachment.questionId.toString() === questionId,
		);

		return questionAttachments;
	}

	async deleteManyByQuestionId(questionId: string): Promise<void> {
		this.questionAttachments = this.questionAttachments.filter(
			(questionAttachment) =>
				questionAttachment.questionId.toString() !== questionId,
		);
	}
}
