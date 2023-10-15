export const sqlToMongoDBcommandsMapping = {
  select: "find",
  insert: "insertMany",
  update: "updateMany",
  delete: "deleteMany",
} as const;

export const sqlToMongoDBoperatorsMapping = {
  "=": "$eq",
  "!=": "$ne",
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
