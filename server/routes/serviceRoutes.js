import express from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });
    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a new service
// @route   POST /api/services
// @access  Protected
router.post("/", protect, async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Protected
router.put("/:id", protect, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Protected
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.json({ success: true, message: "Service removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

