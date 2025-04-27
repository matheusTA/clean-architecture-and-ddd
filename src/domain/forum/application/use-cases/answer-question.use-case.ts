import { type Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list.entity';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.entity';
import { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

type AnswerQuestionUseCaseInput = {
	questionId: string;
	authorId: string;
	answerContent: string;
	attachmentsIds: string[];
};

type AnswerQuestionUseCaseOutputSuccess = {
	answer: Answer;
};

type AnswerQuestionUseCaseoutputError = null;

type AnswerQuestionUseCaseOutput = Either<
	AnswerQuestionUseCaseoutputError,
	AnswerQuestionUseCaseOutputSuccess
>;

export class AnswerQuestionUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		questionId,
		authorId,
		answerContent,
		attachmentsIds,
	}: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput> {
		const answer = Answer.build({
			questionId: new UniqueEntityID(questionId),
			authorId: new UniqueEntityID(authorId),
			content: answerContent,
		});

		const answerAttachments = attachmentsIds.map((attachmentId) =>
			AnswerAttachment.build({
				attachmentId: new UniqueEntityID(attachmentId),
				answerId: answer.id,
			}),
		);

		answer.attachments = new AnswerAttachmentList(answerAttachments);

		await this.answerRepository.create(answer);

		return right({ answer });
	}
}
