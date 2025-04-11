import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';
import { faker } from '@faker-js/faker';

export function makeAnswerComment(
	override: Partial<AnswerComment> = {},
	id?: UniqueEntityID,
) {
	const answerComment = AnswerComment.build(
		{
			authorId: new UniqueEntityID(),
			answerId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);

	return answerComment;
}
