import {SqlToNoSql} from "../dist/index.mjs"

const runner = new SqlToNoSql({
  srcDBtype: "postgresql",
  destDBtype: "mongodb",
  connection: "mongodb://localhost:27017/admin",
});



const main = async () => {
  const resp = await runner.run(
    "select * from users where email = devarifhossain@gmail.com",
  );
  
  console.log(resp);
  return resp;
}

main()
/** ☝️ [{
    _id: new ObjectId("622f07d56852c662cb8b953b"),
    role: 'admin',
    name: 'Arif Hossain',
    email: 'devarifhossain@gmail.com',
    __v: 0
  }]*/