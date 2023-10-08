export const sqlToMongoDBcommandsMapping = {
  select: "find",
  insert: "insertOne",
  update: "updateOne",
  delete: "deleteOne",
};

export const sqlToMongoDBoperatorsMapping = {
  "=": "$eq",
  ">": "$gt",
  "<": "$lt",
  ">=": "$gte",
  "<=": "$lte",
  "<>": "$ne",
};

export const mappings = {
  mongodb: {
    commands: sqlToMongoDBcommandsMapping,
    operators: sqlToMongoDBoperatorsMapping,
  },
};
