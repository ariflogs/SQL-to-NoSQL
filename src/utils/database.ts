import { MongoClient } from "mongodb";

export const connect = async (url: string) => {
  try {
    const client = new MongoClient(url);
    await client.connect();
  } catch (error) {
    throw new Error("Could not connect to Database!");
  }
};
