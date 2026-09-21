import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import bioRoutes from "./routes/bioRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev to simplify integration
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoints
app.get("/", (req, res) => {
  res.json({
    name: "Poonam Oswal API",
    version: "1.0.0",
    status: "online",
    endpoints: {
      bio: "/api/bio",
      books: "/api/books",
      gallery: "/api/gallery",
      services: "/api/services",
      testimonials: "/api/testimonials",
      contact: "/api/contact",
      adminLogin: "/api/admin/login",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Mount API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/bio", bioRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB & Start Server
const startServer = async () => {
  if (process.env.NODE_ENV !== "test") {
    if (process.env.MONGO_URI) {
      await connectDB();
    } else {
      console.warn("⚠️  Warning: MONGO_URI is not defined in .env. Database connection skipped.");
    }
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
};

startServer();

export default app;

