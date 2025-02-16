import { randomUUID } from 'node:crypto';

export class UniqueEntityID {
	private _value: string;

	constructor(id?: string) {
		this._value = id ?? randomUUID();
	}

	toString() {
		return this._value;
	}

	public equals(id: UniqueEntityID) {
		return id._value === this._value;
	}
}
