import { MongoClient } from "mongodb";

import { mappings } from "./config/mapping.mjs";
import { parseQuery, parsedQueryToMongoQuery } from "./utils/parser.mjs";
import { connect } from "./utils/database.mjs";
import { SqlToNoSqlType } from "./types/index.mjs";
import { MongoFindOperationType } from "types/nosql.mjs";

export class SqlToNoSql {
  client: MongoClient | undefined;

  constructor(private config: SqlToNoSqlType) {}

  async run(query: string) {
    if (!query) {
      throw new Error("missing query!");
    }

    // // TODO: add better validation!
    // if ([";", "(", ")"].some((char) => query.includes(char))) {
    //   throw new Error("Invalid query, your query contains invalid characters!");
    // }

    const parsedQuery = parseQuery(query);
    if (parsedQuery.command !== "select") {
      throw new Error("Only select queries are supported");
    }
    const mongoQuery: MongoFindOperationType =
      parsedQueryToMongoQuery(parsedQuery);

    if (query !== "select") {
      throw new Error("Only select queries are supported");
    }

    try {
      if (!this.client) {
        this.client = await connect(this.config.connection);
        await this.client.connect();
      }

      const db = this.client.db();
      const collection = db.collection(mongoQuery.collection);

      const data = await collection[mongoQuery[parsedQuery.command]](
        mongoQuery.query,
        {
          projection: mongoQuery.fields,
          sort: mongoQuery.sort,
          limit: mongoQuery.limit || 0,
          skip: mongoQuery.skip || 0,
        },
      ).toArray();

      return data;
    } catch (err) {
      console.error(err);
      throw Error("Something went wrong!");
    }
  }
}
