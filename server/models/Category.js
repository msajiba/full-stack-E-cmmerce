import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "must be atleast 2 charcters"],
      maxlength: [32, "must be atleast 2 charcters"],
    },
    image: {
      type: String,
      required: true,
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
