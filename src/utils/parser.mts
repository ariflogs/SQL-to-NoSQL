// select * from users where id = 1;

import { ParsedSqlType } from "types/sql.mjs";

export const parseQuery = (query: string): ParsedSqlType => {
  const parsedQuery: ParsedSqlType = {
    command: "select",
    table: "",
    columns: [],
    filters: null,
  };

  const [command, ...rest] = query.split(" ");

  const lowerCaseCommand = command.toLowerCase();
  if (lowerCaseCommand !== "select") {
    throw new Error("Only select queries are supported");
  }
  // parsedQuery.command = command;

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

  return parsedQuery;
};
