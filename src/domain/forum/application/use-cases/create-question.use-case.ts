import { type Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list.entity';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.entity';
import { Question } from '@/domain/forum/enterprise/entities/question.entity';

type CreateQuestionUseCaseInput = {
	authorId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
};

type CreateQuestionUseCaseOutputSuccess = {
	question: Question;
};

type CreateQuestionUseCaseoutputError = null;

type CreateQuestionUseCaseOutput = Either<
	CreateQuestionUseCaseoutputError,
	CreateQuestionUseCaseOutputSuccess
>;
export class CreateQuestionUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		authorId,
		title,
		content,
		attachmentsIds,
	}: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
		const question = Question.build({
			authorId: new UniqueEntityID(authorId),
			title,
			content,
		});

		const questionAttachments = attachmentsIds.map((attachmentId) =>
			QuestionAttachment.build({
				attachmentId: new UniqueEntityID(attachmentId),
				questionId: question.id,
			}),
		);

		question.attachments = new QuestionAttachmentList(questionAttachments);

		await this.questionRepository.create(question);

		return right({
			question,
		});
	}
}
