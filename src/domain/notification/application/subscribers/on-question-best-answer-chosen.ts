import { DomainEvents } from '@/core/events/domain-events';
import type { EventHandler } from '@/core/events/event-handler';
import type { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen.event';
import type { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification.use-case';

export class OnQuestionBestAnswerChosen implements EventHandler {
	constructor(
		private answerRepository: AnswerRepository,
		private sendNotificationUseCase: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswerNotification.bind(this),
			QuestionBestAnswerChosenEvent.name,
		);
	}

	private async sendQuestionBestAnswerNotification({
		question,
		bestAnswerId,
	}: QuestionBestAnswerChosenEvent) {
		const bestAnswer = await this.answerRepository.findById(
			bestAnswerId.toString(),
		);

		if (bestAnswer) {
			await this.sendNotificationUseCase.execute({
				recipientId: bestAnswer.authorId.toString(),
				title: `Your question ${question.title.substring(0, 40)}... has a new best answer!`,
				content: bestAnswer.excerpt,
			});
		}
	}
}
