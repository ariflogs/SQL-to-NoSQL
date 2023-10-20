import { expect, test } from "vitest";

const sum = (a: number, b: number) => {
  return a + b;
};

test("adds 1 + 2 to equal 3", async () => {
  const result = await sum(1, 2);

  expect(result).toBe(3);
});
