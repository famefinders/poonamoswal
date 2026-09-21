import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Book type/genre is required"],
      trim: true,
      // e.g. "Poetry & short stories", "Poetry collection", "Memoir"
    },
    tone: {
      type: String,
      default: "nature",
      trim: true,
      // used for css style mapping in frontend: book-cover-nature, book-cover-life, book-cover-memoir
    },
    badge: {
      type: String,
      default: null,
      trim: true,
      // e.g. "Coming Soon · Under Publication"
    },
    description: {
      type: String,
      required: [true, "Book description is required"],
      trim: true,
    },
    author: {
      type: String,
      default: "Poonam Oswal",
      trim: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    buyLink: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;

