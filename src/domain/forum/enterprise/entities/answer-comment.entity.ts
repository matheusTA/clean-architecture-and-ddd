import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import {
	Comment,
	type CommentProps,
} from '@/domain/forum/enterprise/entities/comment.entity';

export interface AnswerCommentProps extends CommentProps {
	answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
	static build(
		props: Optional<AnswerCommentProps, 'createdAt'>,
		id?: UniqueEntityID,
	) {
		const answercomment = new AnswerComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answercomment;
	}

	get answerId() {
		return this.props.answerId;
	}
}
