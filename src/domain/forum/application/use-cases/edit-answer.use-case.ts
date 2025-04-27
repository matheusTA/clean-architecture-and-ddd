import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment.repository';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed.error';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list.entity';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.entity';
import type { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

type EditAnswerUseCaseInput = {
	authorId: string;
	answerId: string;
	content: string;
	attachmentsIds: string[];
};

type EditAnswerUseCaseOutputSuccess = {
	answer: Answer;
};

type EditAnswerUseCaseoutputError = ResourceNotFoundError | NotAllowedError;

type EditAnswerUseCaseOutput = Either<
	EditAnswerUseCaseoutputError,
	EditAnswerUseCaseOutputSuccess
>;
export class EditAnswerUseCase {
	constructor(
		private answerRepository: AnswerRepository,
		private answerAttachmentRepository: AnswerAttachmentRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
		attachmentsIds,
	}: EditAnswerUseCaseInput): Promise<EditAnswerUseCaseOutput> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		if (answer.authorId.toString() !== authorId) {
			return left(new NotAllowedError());
		}

		const currentAnswerAttachments =
			await this.answerAttachmentRepository.findManyByAnswerId(answerId);

		const currentAnswerAttachmentsList = new AnswerAttachmentList(
			currentAnswerAttachments,
		);

		const editedAnswerAttachmentList = attachmentsIds.map((attachmentId) =>
			AnswerAttachment.build({
				attachmentId: new UniqueEntityID(attachmentId),
				answerId: answer.id,
			}),
		);

		currentAnswerAttachmentsList.update(editedAnswerAttachmentList);

		answer.content = content;
		answer.attachments = currentAnswerAttachmentsList;

		await this.answerRepository.save(answer);

		return right({
			answer,
		});
	}
}
