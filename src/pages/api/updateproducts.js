import Products from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log("API hit - Request body:", req.body);

    try {
      for (let i = 0; i < req.body.length; i++) {
        let p = await Products.findByIdAndUpdate(req.body[i]._id, req.body[i]);
      }
      res.status(200).json({ success: "Product updated successfully" });
    } catch (error) {
      console.error("Error saving products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
