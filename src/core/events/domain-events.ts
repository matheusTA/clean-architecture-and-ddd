import type { AggregateRoot } from '@/core/entities/aggregate-root';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { DomainEvent } from '@/core/events/domain-event';

type DomainEventCallback = (event: any) => void;

export class DomainEvents {
	private static handlersMap: Record<string, DomainEventCallback[]> = {};
	private static markedAggregates: AggregateRoot<unknown>[] = [];

	public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
		const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

		if (!aggregateFound) {
			this.markedAggregates.push(aggregate);
		}
	}

	private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
		for (const event of aggregate.domainEvents) {
			this.dispatch(event);
		}
	}

	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<unknown>,
	) {
		const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));

		if (index !== -1) {
			this.markedAggregates.splice(index, 1);
		}
	}

	private static findMarkedAggregateByID(
		id: UniqueEntityID,
	): AggregateRoot<unknown> | undefined {
		return this.markedAggregates.find((aggregate) => aggregate.id.equals(id));
	}

	public static dispatchEventsForAggregate(id: UniqueEntityID) {
		const aggregate = this.findMarkedAggregateByID(id);

		if (aggregate) {
			this.dispatchAggregateEvents(aggregate);
			aggregate.clearEvents();
			this.removeAggregateFromMarkedDispatchList(aggregate);
		}
	}

	public static register(
		callback: DomainEventCallback,
		eventClassName: string,
	) {
		const wasEventRegisteredBefore = eventClassName in this.handlersMap;

		if (!wasEventRegisteredBefore) {
			this.handlersMap[eventClassName] = [];
		}

		this.handlersMap[eventClassName].push(callback);
	}

	public static clearHandlers() {
		this.handlersMap = {};
	}

	public static clearMarkedAggregates() {
		this.markedAggregates = [];
	}

	private static dispatch(event: DomainEvent) {
		const eventClassName: string = event.constructor.name;

		const isEventRegistered = eventClassName in this.handlersMap;

		if (isEventRegistered) {
			const handlers = this.handlersMap[eventClassName];

			for (const handler of handlers) {
				handler(event);
			}
		}
	}
}
