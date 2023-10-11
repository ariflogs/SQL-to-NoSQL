// select * from users where id = 1;

import { ParsedSqlType } from "types/sql.mjs";

export const parseQuery = (query: string): ParsedSqlType => {
  const parsedQuery: ParsedSqlType = {
    command: "select",
    table: "",
    columns: [],
    filters: null,
  };

  const [command, ...rest] = query.toLocaleLowerCase().split(" ");

  if (command !== "select") {
    throw new Error("Only select queries are supported");
  }
  parsedQuery.command = command;

  const fromIndex = rest.indexOf("from");
  if (fromIndex === -1) {
    throw new Error("Invalid query, missing FROM keyword");
  }
  parsedQuery.table = rest[fromIndex + 1];
  parsedQuery.columns = rest.slice(0, fromIndex);

  const whereIndex = rest.indexOf("where");
  if (whereIndex !== -1) {
    parsedQuery.filters = [
      {
        column: rest[whereIndex + 1],
        // FIXME: you know what to do here!
        operator: rest[whereIndex + 2] as "=",
        value: rest[whereIndex + 3],
      },
    ];
  }

  return parsedQuery;
};
