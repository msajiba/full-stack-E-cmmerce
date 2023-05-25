import db from "../../../../config/db";
import nc from "next-connect";
import Category from "../../../../server/models/Category";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name, image } = req.body;
    db.connectDb();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exist, Try a different name" });
    }
    await new Category({ name, image }).save();

    db.disconnectDb();
    res.json({
      message: `Category ${name} has been created successfully.`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
