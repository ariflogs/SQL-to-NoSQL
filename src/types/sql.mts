interface filterType {
  column: string;
  operator: "=";
  value: string | number;
}

export interface ParsedSqlType {
  command: "select" | "create";
  table: string;
  columns: string[];
  filters: filterType[] | null;
}
