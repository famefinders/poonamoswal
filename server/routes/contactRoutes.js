import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
router.post("/", async (req, res, next) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !subject) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email, and subject",
      });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      phone: phone || "",
      message: message || "",
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out. Your message has been saved successfully.",
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Protected
router.get("/", protect, async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Mark contact message as read (Admin only)
// @route   PATCH /api/contact/:id/read
// @access  Protected
router.patch("/:id/read", protect, async (req, res, next) => {
  try {
    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contactMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Contact message not found" });
    }
    res.json({ success: true, data: contactMessage });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete contact message (Admin only)
// @route   DELETE /api/contact/:id
// @access  Protected
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const contactMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!contactMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Contact message not found" });
    }
    res.json({ success: true, message: "Message removed successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;