import { connectMongoDb, closeDb } from "../../utils/db";


async function handler(req, res) {
  if (req.method === "POST") {
    // const { name } = req.body;
    const { email, role ,name} = req.body;
  
    //Format the name
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      const categoryName = capitalizeFirstLetter(name);

    //Connect to database;
    const db = await connectMongoDb(req, res);



    // check existing
    const checkExisting = await db.collection("category").findOne({ categoryName: categoryName });

       //send error if duplicate is found
       if (checkExisting) {
        res.status(422).json({
          error: "Category already exists",
        });
        return;
      }


      
    // send error if duplicate is found
    if ( role !== 1) {
      res.status(401).json({
        error: "Not authorize to access this page",
      });
      return;
    }

    //Create new Category
    const newCategory = {
      createdAt: Date.now(),
      categoryName
    };

    try {
      const result = await db.collection("category").insertOne(newCategory);
      newCategory.id = result.insertedId;
    } catch (error) {
      closeDb();
      res.status(500).json({
        success: false,
        error: "Storing data failed",
      });
      return;
    }
    //Send success response

    res.status(201).json({
      message: "Category Created",
    });

    //   close DB connection
    closeDb();
  } else if(req.method === "GET")
  {
    //Connect to database;
    const db = await connectMongoDb(req, res);

    //Get category

    try {
        const result = await db
        .collection("category")
        .find({})
        .toArray();
    
        res.status(200).json({
            success:true,
            message:"Success",
            result
        })
    
   
        
    } catch (error) {
        closeDb();
        res.status(500).json({
            success: false,
            error: "Storing data failed",
        });
        return;
    }

  }
  
  
  
  
  
  
  else {
    res.status(500).json({ message: "Invalid Route" });
  }
}

export default handler;
