import { type Either, right } from '@/core/either';
import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment.repository';
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity';

type ListQuestionCommentsUseCaseInput = {
	questionId: string;
	page: number;
};

type ListQuestionCommentsUseCaseOutputSuccess = {
	questionComments: QuestionComment[];
};

type ListQuestionCommentsUseCaseoutputError = null;

type ListQuestionCommentsUseCaseOutput = Either<
	ListQuestionCommentsUseCaseoutputError,
	ListQuestionCommentsUseCaseOutputSuccess
>;

export class ListQuestionCommentsUseCase {
	constructor(private questionCommentRepository: QuestionCommentRepository) {}

	async execute({
		questionId,
		page,
	}: ListQuestionCommentsUseCaseInput): Promise<ListQuestionCommentsUseCaseOutput> {
		const questionComments =
			await this.questionCommentRepository.findManyByQuestionId(questionId, {
				page,
			});

		return right({
			questionComments,
		});
	}
}
