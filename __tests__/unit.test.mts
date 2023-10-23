import { expect, test } from "vitest";
import { parseQuery, parsedQueryToMongoQuery } from "../src/utils/parser.mjs";

test("Test SQL parser", async () => {
  const result = await parseQuery(
    "select title, price from courses order by price desc limit 10 offset 5",
  );

  expect(result.command).toBe("select");
  expect(result.table).toBe("courses");
  expect(result.columns).toEqual(["title", "price"]);
  expect(result.filters).toBe(null);
  expect(result.orderBy).toEqual({ column: "price", order: "desc" });
  expect(result.limit).toBe(10);
  expect(result.offset).toBe(5);
});

test("Test parsed query to mongodb query builder", async () => {
  const parsedQuery = await parseQuery(
    "select title, price from courses order by price desc limit 10 offset 5",
  );
  const mongoQuery = parsedQueryToMongoQuery(parsedQuery);

  expect(mongoQuery.collection).toBe("courses");
  expect(mongoQuery.select).toBe("find");
  expect(mongoQuery.query).toEqual({});
  expect(mongoQuery.fields).toEqual({ _id: 0, title: 1, price: 1 });
  expect(mongoQuery.sort).toEqual({ price: -1 });
  expect(mongoQuery.limit).toBe(10);
  expect(mongoQuery.skip).toBe(5);
});
