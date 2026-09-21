import express from "express";
import Testimonial from "../models/Testimonial.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Protected
router.post("/", protect, async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Protected
router.put("/:id", protect, async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Protected
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json({ success: true, message: "Testimonial removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

