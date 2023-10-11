import { MongoClient } from "mongodb";

import { mappings } from "./config/mapping.mjs";
import { parseQuery } from "./utils/parser.mjs";
import { connect } from "./utils/database.mjs";
import { SqlToNoSqlType } from "./types/index.mjs";

export class SqlToNoSql {
  client: MongoClient | undefined;

  constructor(private config: SqlToNoSqlType) {}

  async run(query: string) {
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

    try {
      if (!this.client) {
        this.client = await connect(this.config.connection);
        await this.client.connect();
      }

      const db = this.client.db();
      const collection = db.collection(mongoQuery.collection);

      const data = await collection[mongoQuery[q.command]](
        mongoQuery.query,
      ).toArray();

      return data;
    } catch (err) {
      console.error(err);
      throw Error("Something went wrong!");
    }
  }
}
