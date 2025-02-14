import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  private _value: string;

  constructor(id?: string) {
    this._value = id ?? randomUUID();
  }

  get value() {
    return this._value;
  }
}
