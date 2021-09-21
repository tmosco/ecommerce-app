
import initDB from "../../helpers/initDB";

initDB();


export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
