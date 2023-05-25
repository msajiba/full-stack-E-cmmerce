import db from "../../../../config/db";
import nc from "next-connect";
import SubCategory from "../../../../server/models/SubCategory";
import Category from "../../../../server/models/Category";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name, category } = req.body;

    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }

    const sbCtg = await new SubCategory(req.body).save();

    await Category.updateOne(
      {
        _id: category,
      },
      {
        $set: {
          subCategories: sbCtg._id,
        },
      }
    );

    db.disconnectDb();

    res.json({
      message: `SubCategory ${name} has been created successfully.`,
      categories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    return res.json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;

    const exist = await Category.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await SubCategory.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "SubCategory has been deleted successfully",
        subCategory: await SubCategory.find({}).sort({ updatedAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        message: "SubCategory Not Exist Please try to delete exist subcategory",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;

    const exist = await Category.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await SubCategory.findByIdAndUpdate(id, { name });
      db.disconnectDb();
      return res.json({
        message: "SubCategory has been updated successfully",
        subCategory: await SubCategory.find({}).sort({ createdAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        message: "SubCategory Not Exist Please try to update exist subcategory",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;