const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();

// === Configuration ===
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// === Middleware ===
app.use(cors({
   origin: FRONTEND_URL,
   methods: ["GET", "POST", "DELETE"],
   allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === Multer: Use MEMORY STORAGE (no race condition) ===
const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
      files: 10
   },
   fileFilter: (req, file, cb) => {
      const allowed = /jpeg|jpg|png|gif|webp/;
      const ext = allowed.test(path.extname(file.originalname).toLowerCase());
      const mime = allowed.test(file.mimetype);
      if (ext && mime) {
         cb(null, true);
      } else {
         cb(new Error("Only image files allowed: jpeg, jpg, png, gif, webp"));
      }
   }
});

// === ROUTES ===

// 1. UPLOAD IMAGES (100% FIXED)
app.post("/admin/upload", upload.array("images", 10), (req, res) => {
   const category = req.body.categories?.trim();

   // Validate category
   if (!category) {
      return res.status(400).json({ message: "No category selected" });
   }

   // Validate files
   if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
   }

   const uploadDir = path.join(__dirname, "uploads", category);
   if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
   }

   const savedFiles = req.files.map(file => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
      const filePath = path.join(uploadDir, filename);

      // Save file from memory
      fs.writeFileSync(filePath, file.buffer);

      return {
         filename,
         url: `${req.protocol}://${req.get("host")}/uploads/${category}/${filename}`
      };
   });

   console.log(`Uploaded ${savedFiles.length} file(s) to "${category}"`);
   res.json({ message: "Upload successful!", files: savedFiles });
});

// 2. GET IMAGES BY CATEGORY
app.get("/admin/get-images-by", (req, res) => {
   const imageDir = path.join(__dirname, "uploads");
   if (!fs.existsSync(imageDir)) {
      return res.json({ imagesBy: {} });
   }

   const imagesBy = {};

   try {
      const categories = fs.readdirSync(imageDir);
      categories.forEach(cat => {
         const catDir = path.join(imageDir, cat);
         if (fs.lstatSync(catDir).isDirectory()) {
            const files = fs.readdirSync(catDir);
            imagesBy[cat] = files.map(f => ({
               category: cat,
               filename: f,
               url: `${req.protocol}://${req.get("host")}/uploads/${cat}/${f}`
            }));
         }
      });
      res.json({ imagesBy });
   } catch (err) {
      console.error("Error reading images:", err);
      res.status(500).json({ imagesBy: {} });
   }
});

// 3. GET CATEGORIES
app.get("/admin/categories", (req, res) => {
   const imageDir = path.join(__dirname, "uploads");
   if (!fs.existsSync(imageDir)) {
      return res.json({ categories: [] });
   }

   try {
      const categories = fs.readdirSync(imageDir)
         .filter(d => fs.lstatSync(path.join(imageDir, d)).isDirectory());
      res.json({ categories });
   } catch (err) {
      console.error("Error reading categories:", err);
      res.json({ categories: [] });
   }
});

// 4. ADD CATEGORY
app.post("/admin/add-category", (req, res) => {
   const { category } = req.body;
   if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ message: "Valid category name required" });
   }

   const dirPath = path.join(__dirname, "uploads", category.trim());
   if (fs.existsSync(dirPath)) {
      return res.status(400).json({ message: "Category already exists" });
   }

   try {
      fs.mkdirSync(dirPath, { recursive: true });
      res.json({ message: "Category created successfully" });
   } catch (err) {
      console.error("Error creating category:", err);
      res.status(500).json({ message: "Failed to create category" });
   }
});

// 5. DELETE IMAGE
app.delete("/admin/delete/:category/:filename", (req, res) => {
   const { category, filename } = req.params;
   const filePath = path.join(__dirname, "uploads", category, filename);

   if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
   }

   fs.unlink(filePath, err => {
      if (err) {
         console.error("Delete error:", err);
         return res.status(500).json({ message: "Failed to delete file" });
      }
      res.json({ message: "File deleted successfully" });
   });
});

// === Global Error Handler ===
app.use((error, req, res, next) => {
   if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
         return res.status(400).json({ message: "File too large (max 10MB)" });
      }
      if (error.code === "LIMIT_FILE_COUNT") {
         return res.status(400).json({ message: "Too many files (max 10)" });
      }
   }
   if (error.message.includes("Only image files")) {
      return res.status(400).json({ message: error.message });
   }
   console.error("Server error:", error);
   res.status(500).json({ message: "Internal server error" });
});

// === Start Server ===
app.listen(PORT, "0.0.0.0", () => {
   console.log(`Server running on http://localhost:${PORT}`);
   console.log(`Frontend URL: ${FRONTEND_URL}`);
});