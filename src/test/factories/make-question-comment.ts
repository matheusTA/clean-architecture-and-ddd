import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	QuestionComment,
	type QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment.entity';
import { faker } from '@faker-js/faker';

export function makeQuestionComment(
	overrides: Partial<QuestionCommentProps> = {},
	id?: UniqueEntityID,
): QuestionComment {
	const questionComment = QuestionComment.build(
		{
			questionId: new UniqueEntityID(),
			authorId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...overrides,
		},
		id,
	);

	return questionComment;
}
