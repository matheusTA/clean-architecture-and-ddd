import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import {
	Comment,
	type CommentProps,
} from '@/domain/forum/enterprise/entities/comment.entity';

export interface QuestionCommentProps extends CommentProps {
	questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
	static build(
		props: Optional<QuestionCommentProps, 'createdAt'>,
		id?: UniqueEntityID,
	) {
		const questioncomment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return questioncomment;
	}

	get questionId() {
		return this.props.questionId;
	}
}
