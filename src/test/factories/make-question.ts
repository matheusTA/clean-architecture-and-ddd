import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Question,
	type QuestionProps,
} from '@/domain/forum/enterprise/entities/question.entity';
import { faker } from '@faker-js/faker';

export function makeQuestion(
	overrides: Partial<QuestionProps> = {},
	id?: UniqueEntityID,
): Question {
	const question = Question.build(
		{
			authorId: new UniqueEntityID(),
			title: faker.lorem.sentence(),
			content: faker.lorem.text(),
			...overrides,
		},
		id,
	);

	return question;
}
