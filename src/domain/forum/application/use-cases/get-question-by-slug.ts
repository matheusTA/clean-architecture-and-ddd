import { type Either, left, right } from '@/core/either';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found.error';
import type { Question } from '@/domain/forum/enterprise/entities/question.entity';

type GetQuestionBySlugUseCaseInput = {
	slug: string;
};

type GetQuestionBySlugUseCaseOutputSuccess = {
	question: Question;
};

type GetQuestionBySlugUseCaseOutputError = ResourceNotFoundError;

type GetQuestionBySlugUseCaseOutput = Either<
	GetQuestionBySlugUseCaseOutputError,
	GetQuestionBySlugUseCaseOutputSuccess
>;
export class GetQuestionBySlugUseCase {
	constructor(private questionRepository: QuestionRepository) {}

	async execute({
		slug,
	}: GetQuestionBySlugUseCaseInput): Promise<GetQuestionBySlugUseCaseOutput> {
		const question = await this.questionRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({
			question,
		});
	}
}
