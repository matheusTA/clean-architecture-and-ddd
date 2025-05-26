import { WatchedList } from '@/core/entities/watched-list';
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.entity';

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
	compareItems(a: QuestionAttachment, b: QuestionAttachment) {
		return a.attachmentId.equals(b.attachmentId);
	}
}
