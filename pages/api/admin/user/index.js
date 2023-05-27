import db from "../../../../config/db";
import nc from "next-connect";
import User from "../../../../server/models/User";
import bcrypt from "bcrypt";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    db.connectDb();
    const test = await User.findOne({ email, username });
    if (test) {
      return res.status(400).json({
        message: "User already exist, Try a different email & username",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: cryptedPassword });

    const addedUser = await newUser.save();

    db.disconnectDb();
    res.json({
      message: `User ${email} has been created successfully.`,
      addedUser: await User.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// handler.delete(async (req, res) => {
//   try {
//     const { id } = req.body;

//     const exist = await Category.findOne({ _id: id });
//     if (exist) {
//       db.connectDb();
//       await Category.findByIdAndRemove(id);
//       db.disconnectDb();
//       return res.json({
//         message: "Category has been deleted successfully",
//         categories: await Category.find({}).sort({ updatedAt: -1 }),
//       });
//     } else {
//       db.disconnectDb();
//       return res.json({
//         message: "Category Not Exist Please try to delete exist category",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// handler.put(async (req, res) => {
//   try {
//     const { id, name } = req.body;
//     db.connectDb();

//     const exist = await Category.findOne({ _id: id });
//     if (exist) {
//       await Category.findByIdAndUpdate(id, { name });
//       db.disconnectDb();
//       return res.json({
//         message: "Category has been updated successfully",
//         categories: await Category.find({}).sort({ createdAt: -1 }),
//       });
//     } else {
//       db.disconnectDb();
//       return res.json({
//         message: "Category Not Exist Please try to update exist category",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default handler;
