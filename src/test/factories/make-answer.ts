import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Answer,
	type AnswerProps,
} from '@/domain/forum/enterprise/entities/answer.entity';
import { faker } from '@faker-js/faker';

export function makeAnswer(
	overrides: Partial<AnswerProps> = {},
	id?: UniqueEntityID,
): Answer {
	const answer = Answer.build(
		{
			authorId: new UniqueEntityID(),
			questionId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...overrides,
		},
		id,
	);

	return answer;
}
