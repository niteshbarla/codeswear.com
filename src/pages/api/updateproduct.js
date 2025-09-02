import Products from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log("API hit - Request body:", req.body);

    try {
      for (let i = 0; i < req.body.length; i++) {
        let p = new Products({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty,
        });
        await p.save();
        console.log("Product saved:", req.body[i].title);
      }
      res.status(200).json({ success: "Product added successfully" });
    } catch (error) {
      console.error("Error saving products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
