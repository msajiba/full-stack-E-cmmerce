import db from "../../../../config/db";
import nc from "next-connect";
import Blog from "../../../../server/models/Blog";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name } = req.body;
    db.connectDb();
    const test = await Blog.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Blog already exist, Try a different name" });
    }
    await new Blog(req.body).save();

    db.disconnectDb();
    res.json({
      message: `Blog ${name} has been created successfully.`,
      blogs: await Blog.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;

    const exist = await Blog.findOne({ _id: id });
    if (exist) {
      db.connectDb();
      await Blog.findByIdAndRemove(id);
      db.disconnectDb();
      return res.json({
        message: "Blog has been deleted successfully",
        Blogs: await Blog.find({}).sort({ updatedAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        message: "Blog Not Exist Please try to delete exist blog",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    db.connectDb();

    const exist = await Blog.findOne({ _id: id });
    if (exist) {
      await Blog.findByIdAndUpdate(id, { name });
      db.disconnectDb();
      return res.json({
        message: "Blog has been updated successfully",
        blogs: await Blog.find({}).sort({ createdAt: -1 }),
      });
    } else {
      db.disconnectDb();
      return res.json({
        message: "Blog Not Exist Please try to update exist Blog",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
