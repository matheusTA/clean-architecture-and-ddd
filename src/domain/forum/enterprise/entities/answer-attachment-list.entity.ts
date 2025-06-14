import { WatchedList } from '@/core/entities/watched-list';
import type { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.entity';

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
	compareItems(a: AnswerAttachment, b: AnswerAttachment) {
		return a.attachmentId.equals(b.attachmentId);
	}
}
