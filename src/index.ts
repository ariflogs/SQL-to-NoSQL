import { mappings } from "./config/mapping.js";
import { parseQuery } from "./utils/parser.js";

export const SqlToNoSql = (query: string) => {
  if (!query) {
    throw new Error("missing query!");
  }

  if ([";", "(", ")"].some((char) => query.includes(char))) {
    throw new Error("Invalid query, your query contains invalid characters!");
  }

  const q = parseQuery(query);

  const filters: {
    [key: string]: {
      [operator: string]: string | number;
    };
  } = {};

  q.filters?.forEach((filter) => {
    const { column, operator, value } = filter;

    if (!filters[column]) {
      filters[column] = {
        [mappings["mongodb"]["operators"][operator]]: value,
      };
    }
  });

  const mongoQuery = {
    collection: q.table,
    [q.command]: mappings["mongodb"]["commands"][q.command],
    query: filters,
  };

  return mongoQuery;
};

console.log(SqlToNoSql("SELECT * FROM users"));
console.log(SqlToNoSql("select * from users where id = 1"));
