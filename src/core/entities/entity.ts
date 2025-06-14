import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<PropsType> {
	private _id: UniqueEntityID;
	protected props: PropsType;

	protected constructor(props: PropsType, id?: UniqueEntityID) {
		this.props = props;
		this._id = id ?? new UniqueEntityID();
	}

	get id() {
		return this._id;
	}

	public equals(entity: Entity<unknown>) {
		if (entity === this) {
			return true;
		}

		if (entity.id === this._id) {
			return true;
		}

		return false;
	}
}
