import { MongoClient } from "mongodb";

const client = MongoClient.connect(``)



let client;
    try {
        client = await MongoClient.connect(`${orocess.env.MONGODB_URI}`);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "could not connect to database",
      });
      return;
    }
    const db =client.db();