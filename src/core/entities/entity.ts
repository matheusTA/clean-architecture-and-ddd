import { UniqueEntityID } from "./unique-entity-id";

export class Entity<PropsType> {
  private _id: UniqueEntityID;
  protected props: PropsType;

  protected constructor(props: PropsType, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  get id() {
    return this._id.value;
  }
}
