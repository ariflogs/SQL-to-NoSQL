import { mappings } from "./config/mapping.js";
import { parseQuery } from "./utils/parser.js";
import { connect } from "./utils/database.js";
import { SqlToNoSqlType } from "./types/index.js";

export class SqlToNoSql {
  constructor(private config: SqlToNoSqlType) {
    connect(this.config.connection);
  }

  run(query: string) {
    if (!query) {
      throw new Error("missing query!");
    }

    // TODO: add better validation!
    if ([";", "(", ")"].some((char) => query.includes(char))) {
      throw new Error("Invalid query, your query contains invalid characters!");
    }

    const q = parseQuery(query);

    const filters: {
      [key: string]: {
        [operator: string]: string | number;
      };
    } = {};

    // Convert parsed filters to MongoDB query
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
  }
}

const runner = new SqlToNoSql({
  srcDBtype: "postgresql",
  destDBtype: "mongodb",
  connection: "mongodb://localhost:27017",
});

console.log(runner.run("SELECT * FROM users"));
console.log(runner.run("select * from users where id = 1"));
