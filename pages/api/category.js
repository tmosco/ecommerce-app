import { connectMongoDb, closeDb } from "../../utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    // const { name } = req.body;
    const { email, role ,name} = req.body;
    console.log(name);


    //Connect to database;
    const db = await connectMongoDb(req, res);

    // check existing
    const checkExisting = await db.collection("category").findOne({ name: name });

       //send error if duplicate is found
       if (checkExisting) {
        res.status(422).json({
          message: "Category already exists",
        });
        // throw new Error("Category already exists");
        return;
      }

    // send error if duplicate is found
    if ( role !== 1) {
      res.status(401).json({
        message: "Not authorize to access this page",
      });
      return;
    }

    //Create new Category

    const newCategory = {
      createdAt: Date.now(),
      name
    };

    try {
      const result = await db.collection("category").insertOne(newCategory);
      newCategory.id = result.insertedId;
    } catch (error) {
      closeDb();
      res.status(500).json({
        success: false,
        message: "Storing data failed",
      });
      return;
    }
    //Send success response

    res.status(201).json({
      message: "Category Created",
    });

    //   close DB connection
    closeDb();
  } else {
    res.status(500).json({ message: "Invalid Route" });
  }
}

export default handler;
