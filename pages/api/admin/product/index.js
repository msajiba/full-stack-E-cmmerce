import nc from "next-connect";
import Product from "../../../../server/models/Product";
import db from "../../../../config/db";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name } = req.body;
    db.connectDb();
    const test = await Product.findOne({ name });
    if (test) {
      return res.json({
        status: false,
        message: "Product already exist, Try a different name",
      });
    }
    await new Product(req.body).save();

    db.disconnectDb();
    res.json({
      message: `Product ${title} has been created`,
      status: true,
      products: await Product.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;

    const exist = await Product.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await Product.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "Product has been deleted successfully",
        categories: await Product.find({}).sort({ updatedAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        message: "Product Not Exist Please try to delete exist Product",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id } = req.body;
    db.connectDb();

    const exist = await Product.findOne({ _id: id });
    if (exist) {
      await Product.findByIdAndUpdate(id, req.body);
      db.disconnectDb();
      return res.json({
        message: "Product has been updated successfully",
        categories: await Product.find({}).sort({ createdAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        message: "Product Not Exist Please try to update exist Product",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
