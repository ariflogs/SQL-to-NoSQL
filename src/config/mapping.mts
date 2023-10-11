export const sqlToMongoDBcommandsMapping = {
  select: "find", // s!
  insert: "insertMany",
  update: "updateMany",
  delete: "deleteMany",
} as const;

export const sqlToMongoDBoperatorsMapping = {
  "=": "$eq", // s!
  "!=": "$ne", // s!
  ">": "$gt",
  "<": "$lt",
  ">=": "$gte",
  "<=": "$lte",
  "<>": "$ne",
} as const;

export const mappings = {
  mongodb: {
    commands: sqlToMongoDBcommandsMapping,
    operators: sqlToMongoDBoperatorsMapping,
  },
};
