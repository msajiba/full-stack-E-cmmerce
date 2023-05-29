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
      return res.json({
        message: "SubCategory already exist, Try a different name",
        status: false,
      });
    }

    const sbCtg = await new SubCategory(req.body).save();

    await Category.updateOne(
      {
        _id: category,
      },
      {
        $push: {
          subCategories: sbCtg._id,
        },
      }
    );

    db.disconnectDb();

    res.json({
      message: `SubCategory ${name} has been created`,
      status: true,
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
    const exist = await SubCategory.findOne({ _id: id });

    if (exist) {
      db.connectDb();
      await SubCategory.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "SubCategory has been deleted",
        status: true,
        subCategory: await SubCategory.find({}).sort({ updatedAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        status: false,
        message: "SubCategory Not Exist Please try to delete exist subcategory",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.patch(async (req, res) => {
  try {
    const { id, name } = req.body;
    const exist = await SubCategory.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await SubCategory.findByIdAndUpdate(id, { name });
      res.json({ status: true, message: "Sub-Category update" });
    } else {
      db.disconnectDb();
      return res.json({
        status: false,
        message: "SubCategory Not Exist Please try to update exist subcategory",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
