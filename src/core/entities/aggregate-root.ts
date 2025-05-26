import { Entity } from '@/core/entities/entity';
import type { DomainEvent } from '@/core/events/domain-event';
import { DomainEvents } from '@/core/events/domain-events';

export abstract class AggregateRoot<Props> extends Entity<Props> {
	private _doaminEvents: DomainEvent[] = [];

	get domainEvents(): DomainEvent[] {
		return this._doaminEvents;
	}

	protected addDomainEvent(domainEvent: DomainEvent): void {
		this._doaminEvents.push(domainEvent);
		DomainEvents.markAggregateForDispatch(this);
	}

	public clearEvents() {
		this._doaminEvents = [];
	}
}
