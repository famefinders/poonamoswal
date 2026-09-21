import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery item title is required"],
      trim: true,
    },
    detail: {
      type: String,
      default: "",
      trim: true,
    },
    size: {
      type: String,
      enum: ["standard", "tall", "wide"],
      default: "standard",
      // maps to grid spanning in frontend: tall = row-span-2, wide = sm:col-span-2
    },
    imageUrl: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);
export default GalleryImage;

