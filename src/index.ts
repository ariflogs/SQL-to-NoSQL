import { parseQuery } from "./utils/parser.js";

export const SqlToNoSql = (query: string) => {
  if (!query) {
    throw new Error("missing query!");
  }

  if ([";", "(", ")"].some((char) => query.includes(char))) {
    throw new Error("Invalid query, your query contains invalid characters!");
  }

  const q = parseQuery(query);
  return q;
};

console.log(SqlToNoSql("SELECT * FROM users"));
console.log(SqlToNoSql("select * from users where id = 1"));
