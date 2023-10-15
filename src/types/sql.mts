export type SqlCommandOptions = "select" | "insert";

interface FilterType {
  column: string;
  operator: "=";
  value: string | number;
}

export interface ParsedSqlType {
  command: SqlCommandOptions;
  table: string;
  columns: string[];
  filters: FilterType[] | null;
}
