import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [2, "must be atleast 2 charcters"],
      maxlength: [32, "must be atleast 2 charcters"],
    },
    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: [2, "must be atleast 2 charcters"],
      maxlength: [250, "must be atleast 2 charcters"],
    },
    thumbnail: {
      type: String,
      required: true,
    },

    image: [],

    price: {
      type: Number,
      required: true,
    },
    original_price: {
      type: Number,
      required: true,
    },

    bestdeal: {
      type: Boolean,
      default: false,
    },
    discountedsale: {
      type: Boolean,
      default: false,
    },

    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
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
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Category;
