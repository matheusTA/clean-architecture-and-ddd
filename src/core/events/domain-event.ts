import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface DomainEvent {
	ocurredAt: Date;

	getAggregateId(): UniqueEntityID;
}
