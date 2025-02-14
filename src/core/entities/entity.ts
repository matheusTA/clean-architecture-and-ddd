import { UniqueEntityID } from "./unique-entity-id";

export class Entity<PropsType> {
  private _id: UniqueEntityID;
  protected props: PropsType;

  constructor(props: PropsType, id?: string) {
    this.props = props;
    this._id = new UniqueEntityID(id);
  }

  get id() {
    return this._id.value;
  }
}
