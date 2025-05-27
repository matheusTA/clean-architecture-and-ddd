import { DomainEvents } from '@/core/events/domain-events';
import type { EventHandler } from '@/core/events/event-handler';
import type { QuestionRepository } from '@/domain/forum/application/repositories/question.repository';
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created.event';
import type { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification.use-case';

export class OnAnswerCreated implements EventHandler {
	constructor(
		private questionRepository: QuestionRepository,
		private sendNotificationUseCase: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name,
		);
	}

	private async sendNewAnswerNotification(event: AnswerCreatedEvent) {
		const { answer } = event;

		const question = await this.questionRepository.findById(
			answer.questionId.toString(),
		);

		if (question) {
			await this.sendNotificationUseCase.execute({
				recipientId: question.authorId.toString(),
				title: `New answer in ${question.title.substring(0, 40)}...`,
				content: answer.excerpt,
			});
		}
	}
}
