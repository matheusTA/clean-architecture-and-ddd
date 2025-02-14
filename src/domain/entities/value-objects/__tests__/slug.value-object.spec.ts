import { expect, test } from "vitest";
import { Slug } from "../slug.value-object";

test("it should be able to create a new slug from text", async () => {
  const slug = Slug.createFromText("Hello, World!");

  expect(slug.value).toBe("hello-world");
});
