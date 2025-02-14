import { Slug } from "./value-objects/slug.value-object";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface QuestionProps {
  createdAt: Date;
  updatedAt?: Date;
  authorId: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  bestAnswerId?: UniqueEntityID;
}

export class Question extends Entity<QuestionProps> {}
