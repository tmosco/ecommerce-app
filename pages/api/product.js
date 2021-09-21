import { connectMongoDb, closeDb } from "../../utils/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id, role, data } = req.body;

    //Connect to database;
    const db = await connectMongoDb(req, res);

    // check existing
    const checkExisting = await db
      .collection("product")
      .findOne({ name: data.name });

    //send error if duplicate is found
    if (checkExisting) {
      res.status(422).json({
        success: false,
        error: "Product already exists",
      });
      // throw new Error("Category already exists");
      return;
    }

    // if not admin
    if (role !== 1) {
      res.status(401).json({
        success: false,
        error: "Not authorize to access this page",
      });
      return;
    }

    //Create new Product

    const newProduct = {
      createdAt: Date.now(),
      User_id: id,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      sold: 0,
      category: data.categories,
      delivery: data.delivery,
    };

    try {
      const result = await db.collection("product").insertOne(newProduct);
      newProduct.id = result.insertedId;
    } catch (error) {
      closeDb();
      res.status(500).json({
        success: false,
        error: "Cannot save to database",
      });
      return;
    }

    // Send Success response
    res.status(201).json({
      success: true,
      message: "Product Created",
    });

    //   close DB connection
    closeDb();
  } else if (req.method === "GET") {
 //Connect to database;
 const db = await connectMongoDb(req, res);

 //Get category

 try {
     const products = await db
     .collection("product")
     .find({})
     .toArray();
 
     res.status(200).json({
         success:true,
         message:"Success",
         products
     })
 

     
 } catch (error) {
     closeDb();
     res.status(500).json({
         success: false,
         error: "Fetching failed",
     });
     return;
 }

  } else {
    res.status(500).json({ success: false, message: "Invalid Route" });
  }
}

export default handler;
