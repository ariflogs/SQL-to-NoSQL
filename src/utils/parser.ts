export const parseQuery = (query: string) => {
  const [command, ...rest] = query.split(" ");

  if (command !== "SELECT") {
    throw new Error("Only SELECT queries are supported");
  }

  const fromIndex = rest.findIndex((word) => word === "FROM");
  if (fromIndex === -1) {
    throw new Error("Invalid query, missing FROM keyword");
  }

  const columns = rest.slice(0, fromIndex);
  const table = rest[fromIndex + 1];

  return { command, table, columns };
};
