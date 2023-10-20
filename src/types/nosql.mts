import { mappings } from "config/mapping.mjs";
import { SqlCommandOptions } from "./sql.mjs";

export type MongoCommandOptions = "find" | "insertMany";

export interface MongoQueryType {
  [key: string]: {
    [operator: string]: string | number;
  };
}

export interface MongoFieldSelectionType {
  [key: string]: 1 | 0;
}

export interface MongoSortType {
  [key: string]: 1 | -1;
}

export interface MongoFindOperationType {
  select: (typeof mappings)["mongodb"]["commands"]["select"]; // sql -> mongodb
  collection: string;
  query: MongoQueryType;
  fields: MongoFieldSelectionType;
  sort: MongoSortType;
  limit: number | null;
  skip: number | null;
}
