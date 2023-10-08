const runner = new SqlToNoSql({
    srcDBtype: "postgresql",
    destDBtype: "mongodb",
    connection: process.env.TEST_MONGODB_URI,
});

console.log(runner.run("select * from users where role = admin"));
