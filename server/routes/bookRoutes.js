import express from "express";
import Book from "../models/Book.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all books
// @route   GET /api/books
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().sort({ order: 1, createdAt: 1 });
    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a new book
// @route   POST /api/books
// @access  Protected
router.post("/", protect, async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Protected
router.put("/:id", protect, async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Protected
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, message: "Book removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

