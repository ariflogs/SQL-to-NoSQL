import { MongoClient } from "mongodb";

import { mappings } from "./config/mapping.mjs";
import { parseQuery } from "./utils/parser.mjs";
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

    const q = parseQuery(query);

    if (q.command !== "select") {
      throw new Error("Only select queries are supported");
    }

    const mongoQuery: MongoFindOperationType = {
      collection: q.table,
      [q.command]: mappings["mongodb"]["commands"][q.command],
      query: {},
      fields: {
        // coz mongodb by default returns _id
        _id: 0,
      },
      sort: {},
      limit: q.limit,
      skip: q.offset,
    };

    // Convert parsed columns to document fields
    q.columns?.forEach((column) => {
      if (column === "*") {
        return;
      }
      if (column === "_id") {
        mongoQuery.fields["_id"] = 1;
        return;
      }
      mongoQuery.fields[column] = 1;
    });

    // Convert parsed filters to MongoDB query
    q.filters?.forEach((filter) => {
      const { column, operator, value } = filter;

      if (!mongoQuery.query[column]) {
        mongoQuery.query[column] = {
          [mappings["mongodb"]["operators"][operator]]: value,
        };
      }
    });

    // Convert parsed orderBy to MongoDB sort
    if (q.orderBy) {
      const { column, order } = q.orderBy;
      mongoQuery.sort[column] = order === "asc" ? 1 : -1;
    }

    try {
      if (!this.client) {
        this.client = await connect(this.config.connection);
        await this.client.connect();
      }

      const db = this.client.db();
      const collection = db.collection(mongoQuery.collection);

      const data = await collection[mongoQuery[q.command]](mongoQuery.query, {
        projection: mongoQuery.fields,
        sort: mongoQuery.sort,
        limit: q.limit || 0,
        skip: q.offset || 0,
      }).toArray();

      return data;
    } catch (err) {
      console.error(err);
      throw Error("Something went wrong!");
    }
  }
}
