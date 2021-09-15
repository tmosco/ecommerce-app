import { MongoClient } from "mongodb";

export async function connectMongoDb(req, res) {
  let client;
  try {
    client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "could not connect to database",
    });
    return error;
  }
  const db = client.db();

  return db;
}

export async function closeDb() {
  const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
  return client.close();
}
