import initDB from "../../helpers/initDB";
import Category from "../../models/Category";
import errorHandler from "../../utils/errorHanlder";
import ErrorHanlder from "../../utils/errorHanlder"




initDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const category = await Category.find({});
    res.status(200).json({ success: true, data: category });
  }
  if (req.method === "POST") {
    const { email, role, name } = req.body;
    console.log(role);

    //Format the name
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const categoryName = capitalizeFirstLetter(name);

   // send error if duplicate is found
   if ( role !== 1) {
     const code="not Admin";
     errorHandler(res,req,code)
    // res.status(401).json({
    //   error: "Not authorize to access this page",
    // });
    return;
  }

    const newCategory = {
      createdAt: Date.now(),
      name: categoryName,
    };
    try {
      const category = await Category.create(newCategory);
      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      errorHandler(res,req,error.code)
      return
    }
  }
}
