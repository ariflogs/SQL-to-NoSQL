## SQL-to-NOSQL

As the name suggests, **sql-to-nosql** lets you run SQL scripts on your NoSQL database.

### Status

The project is under active development and is not yet ready to use in production. I'm aiming to launch _v-1.0_ by November 2023 with some of the most common sql operations. 🤞

---

## Installation

```bash
npm insall sql-to-nosql
```

## Usage

```js
import { SqlToNoSql } from "sql-to-nosql";

const runner = new SqlToNoSql({
  srcDBtype: "postgresql",
  destDBtype: "mongodb",
  connection: "YOUR_DEST_DB_CONNECTION_STRING",
});

const resp = await runner.run(
  "select * from users where email = devarifhossain@gmail.com",
);

console.log(resp);
/** ☝️ [{
    _id: new ObjectId("622f07d56852c662cb8b953b"),
    role: 'admin',
    name: 'Arif Hossain',
    email: 'devarifhossain@gmail.com',
    __v: 0
  }]*/
```

---

## Roadmap

- [ ] Database
  - [x] MongoDB
- [ ] Commands
  - [x] SELECT
  - [ ] INSERT
  - [ ] DELETE
  - [ ] UPDATE
- [ ] Clauses
  - [x] WHERE
  - [ ] ORDER BY
  - [ ] LIMIT
  - [ ] OFFSET
  - [ ] GROUP BY
  - [ ] HAVING
  - [ ] JOIN
  - [ ] UNION
  - [ ] INTERSECT
  - [ ] EXCEPT
- [ ] Functions
  - [ ] COUNT
  - [ ] SUM
  - [ ] AVG
  - [ ] MIN
  - [ ] MAX
- [ ] Operators
  - [x] =
  - [x] !=
  - [x] >
  - [x] <
  - [x] > =
  - [x] <=
  - [ ] AND
  - [ ] OR
  - [ ] NOT
  - [ ] IN
  - [ ] BETWEEN
  - [ ] LIKE
  - [ ] IS NULL
  - [ ] IS NOT NULL
- [ ] Typescript Support
