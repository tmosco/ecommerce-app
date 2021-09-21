import initDB from "../../helpers/initDB";
import Product from "../../models/Product";

initDB();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const product = await Product.find({});
    res.status(200).json({ success: true, data: product });
  }
  if (req.method === "POST") {
    const { id, role, data } = req.body;

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

    const product = await Product.create(newProduct);
    res.status(201).json({
      success: true,
      data: product,
    });
  }
}



