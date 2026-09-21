import express from "express";
import GalleryImage from "../models/GalleryImage.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const items = await GalleryImage.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const item = await GalleryImage.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Protected
router.post("/", protect, async (req, res, next) => {
  try {
    const item = await GalleryImage.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Protected
router.put("/:id", protect, async (req, res, next) => {
  try {
    const item = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Protected
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const item = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }
    res.json({ success: true, message: "Gallery item removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

