import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment.repository';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list.entity';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.entity';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

type EditQuestionUseCaseInput = {
	authorId: string;
	questionId: string;
	title: string;
	content: string;
	attachmentsIds: string[];
};

type EditQuestionUseCaseOutputSuccess = {
	question: Question;
};

type EditQuestionUseCaseoutputError = ResourceNotFoundError | NotAllowedError;

type EditQuestionUseCaseOutput = Either<
	EditQuestionUseCaseoutputError,
	EditQuestionUseCaseOutputSuccess
>;
export class EditQuestionUseCase {
	constructor(
		private questionRepository: QuestionRepository,
		private questionAttachmentRepository: QuestionAttachmentRepository,
	) {}

	async execute({
		authorId,
		questionId,
		title,
		content,
		attachmentsIds,
	}: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseOutput> {
		const question = await this.questionRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (question.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		const currentQuestionAttachments =
			await this.questionAttachmentRepository.findManyByQuestionId(questionId);

		const currentQuestionAttachmentsList = new QuestionAttachmentList(
			currentQuestionAttachments,
		);

		const editedQuestionAttachmentList = attachmentsIds.map((attachmentId) =>
			QuestionAttachment.build({
				attachmentId: new UniqueEntityID(attachmentId),
				questionId: question.id,
			}),
		);

		currentQuestionAttachmentsList.update(editedQuestionAttachmentList);

		question.title = title;
		question.content = content;
		question.attachments = currentQuestionAttachmentsList;
		await this.questionRepository.save(question);

		return right({
			question,
		});
	}
}
