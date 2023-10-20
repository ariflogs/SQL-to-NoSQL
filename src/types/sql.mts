export type SqlCommandOptions = "select" | "insert";

interface FilterType {
  column: string;
  operator: "=";
  value: string | number;
}

interface OrderByType {
  column: string;
  order: "asc" | "desc";
}

export interface ParsedSqlType {
  command: SqlCommandOptions;
  table: string;
  columns: string[];
  filters: FilterType[] | null;
  orderBy: OrderByType | null;
}
