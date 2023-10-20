// select * from users where id = 1;

import { ParsedSqlType } from "types/sql.mjs";

export const parseQuery = (query: string): ParsedSqlType => {
  const parsedQuery: ParsedSqlType = {
    command: "select",
    table: "",
    columns: [],
    filters: null,
    orderBy: null,
    limit: null,
    offset: null,
  };

  // for splliting by comma and space
  const [command, ...rest] = query.split(/, |,| /);

  const lowerCaseCommand = command.toLowerCase();
  if (lowerCaseCommand !== "select") {
    throw new Error("Only select queries are supported");
  }

  const fromIndex = rest.findIndex((word) => word.toLowerCase() === "from");
  if (fromIndex === -1) {
    throw new Error("Invalid query, missing FROM keyword");
  }
  parsedQuery.table = rest[fromIndex + 1];
  parsedQuery.columns = rest.slice(0, fromIndex);

  const whereIndex = rest.findIndex((word) => word.toLowerCase() === "where");
  if (whereIndex !== -1) {
    parsedQuery.filters = [
      {
        column: rest[whereIndex + 1],
        operator: rest[whereIndex + 2] as "=",
        // to handle string and number values
        value:
          Number(rest[whereIndex + 3]) ||
          // remove quotes from string values
          String(rest[whereIndex + 3]).replace(/^'(.*)'$/, "$1"),
      },
    ];
  }

  const orderByIndex = rest.findIndex((word) => word.toLowerCase() === "order");
  if (orderByIndex !== -1) {
    // couldn't find index with "order by" coz we splitted by space!! 😶
    // ikr, but it works though 🤷
    if (rest[orderByIndex + 1].toLowerCase() !== "by") {
      throw new Error("Invalid query, missing BY keyword");
    }
    parsedQuery.orderBy = {
      column: rest[orderByIndex + 2], // coz "order by" is 2 words..
      order: ["asc", "desc"].includes(rest[orderByIndex + 3])
        ? (rest[orderByIndex + 3] as "asc" | "desc")
        : "asc",
    };
  }

  const limitIndex = rest.findIndex((word) => word.toLowerCase() === "limit");
  if (limitIndex !== -1) {
    parsedQuery.limit = Number(rest[limitIndex + 1]);
  }

  const offsetIndex = rest.findIndex((word) => word.toLowerCase() === "offset");
  if (offsetIndex !== -1) {
    parsedQuery.offset = Number(rest[offsetIndex + 1]);
  }

  return parsedQuery;
};
