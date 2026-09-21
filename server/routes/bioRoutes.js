import express from "express";
import Bio from "../models/Bio.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get bio / profile details
// @route   GET /api/bio
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    if (req.query.all === "true") {
      const bios = await Bio.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bios.length, data: bios });
    }

    const bio = await Bio.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!bio) {
      return res.json({
        success: true,
        data: null,
        message: "No bio found. Run the seed script or create one.",
      });
    }

    res.json({ success: true, data: bio });
  } catch (error) {
    next(error);
  }
});

// @desc    Get bio by ID
// @route   GET /api/bio/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const bio = await Bio.findById(req.params.id);
    if (!bio) {
      return res.status(404).json({ success: false, message: "Bio not found" });
    }
    res.json({ success: true, data: bio });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new bio
// @route   POST /api/bio
// @access  Protected
router.post("/", protect, async (req, res, next) => {
  try {
    const bio = await Bio.create(req.body);
    res.status(201).json({ success: true, data: bio });
  } catch (error) {
    next(error);
  }
});

// @desc    Update active or latest bio (upsert convenience)
// @route   PUT /api/bio
// @access  Protected
router.put("/", protect, async (req, res, next) => {
  try {
    let bio = await Bio.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!bio) {
      bio = await Bio.create(req.body);
      return res.status(201).json({ success: true, data: bio });
    }

    Object.assign(bio, req.body);
    const updatedBio = await bio.save();
    res.json({ success: true, data: updatedBio });
  } catch (error) {
    next(error);
  }
});

// @desc    Update bio by ID
// @route   PUT /api/bio/:id
// @access  Protected
router.put("/:id", protect, async (req, res, next) => {
  try {
    const bio = await Bio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bio) {
      return res.status(404).json({ success: false, message: "Bio not found" });
    }
    res.json({ success: true, data: bio });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete bio by ID
// @route   DELETE /api/bio/:id
// @access  Protected
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const bio = await Bio.findByIdAndDelete(req.params.id);
    if (!bio) {
      return res.status(404).json({ success: false, message: "Bio not found" });
    }
    res.json({ success: true, message: "Bio removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

