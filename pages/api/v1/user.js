import fs from "fs";
import path from "path";
import { hash, genSaltSync } from "bcryptjs";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!email || !email.includes("@") || !password) {
      res.status(422).json({
        message: "Invalid Data",
      });
      return;
    }

    //Connect to database;
    let client;
    try {
      client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "could not connect to database",
      });
      return;
    }
    const db = client.db();

    // check existing
    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });

    //send error if duplicate is found
    if (checkExisting) {
      res.status(422).json({
        message: "User already exists",
      });
      return;
    }

    //Hash password
    const salt = await genSaltSync(10);
    const hash_password = await hash(password, salt);

    //Create new user

    const newUser = {
      name,
      email,
      hash_password,
    };

    try {
      const result = await db.collection("users").insertOne(newUser);

      newUser.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({
        success: false,
        message: "Storing data failed",
      });
      return;
    }
    //Send success response

    res.status(201).json({
      message: "User created",
    });

    //   close DB connection
    client.close();

    // // cosole.log(name,email,password)
    // const filePath = path.join(process.cwd(), "data", "user.json");
    // const fileData = fs.readFileSync(filePath);
    // const data = JSON.parse(fileData);
    // data.push(newUser);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // res.status(201).json({ message: "Success", user: newUser });
  } else {
    res.status(500).json({ message: "Invalid Route" });
  }
}

export default handler;
