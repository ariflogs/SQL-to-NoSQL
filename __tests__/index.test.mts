import { expect, test } from "vitest";
import { MongoClient } from "mongodb";
import { SqlToNoSql } from "../src/index.mjs";

const mongoConnection = "mongodb://localhost:27017/admin";

const runner = new SqlToNoSql({
  srcDBtype: "postgresql",
  destDBtype: "mongodb",
  connection: mongoConnection,
});

const userData = [
  {
    name: "Arif Hossain",
    email: "arif@gmail.com",
    phone: "01300000000",
    age: 24,
  },
  {
    name: "Tanvir Rahman",
    email: "tanvir@gmail.com",
    phone: "01800000000",
    age: 25,
  },
];

const insertUser = async () => {
  const client = new MongoClient(mongoConnection);
  await client.connect();

  const db = client.db();
  const collection = db.collection("users");
  const count = await collection.countDocuments();

  if (count !== 2) {
    await collection.insertMany(userData);
  }

  await client.close();
};

console.log("before insert");
(async () => {
  await insertUser();
})();
console.log("after insert");

console.log("before test");
test("Find user with email = arif@gmail.com", async () => {
  const result = await runner.run(
    "select name, email, phone, age from users where email = 'arif@gmail.com'",
  );
  console.log("user", result);

  expect(result[0].email).toBe(userData[0].email);
});
console.log("after test");

test("Find collection count", async () => {
  const result = await runner.run("select * from users");
  console.log("length:", result.length);

  expect(result.length).toBe(userData.length);
});
