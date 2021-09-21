import User from "../../../models/User";
import initDB from "../../../helpers/initDB"




initDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
 
    

    try {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      // errorHandler(res,req,error.code)
      console.log(error);
      return
    }
  }
}
