const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({ origin: FRONTEND_URL, methods: ["GET", "POST", "DELETE"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MEMORY STORAGE
const upload = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: 10 * 1024 * 1024, files: 10 },
   fileFilter: (req, file, cb) => {
      const allowed = /jpeg|jpg|png|gif|webp/;
      const ext = allowed.test(path.extname(file.originalname).toLowerCase());
      const mime = allowed.test(file.mimetype);
      cb(null, ext && mime);
   }
});

// UPLOAD
app.post("/admin/upload", upload.array("images", 10), (req, res) => {
   const category = req.body.categories?.trim();
   if (!category) return res.status(400).json({ message: "Կատեգորիա ընտրված չէ" });
   if (!req.files?.length) return res.status(400).json({ message: "Ֆայլեր չեն վերբեռնվել" });

   const dir = path.join(__dirname, "uploads", category);
   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

   const saved = req.files.map(file => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`;
      const filePath = path.join(dir, name);
      fs.writeFileSync(filePath, file.buffer);
      return { filename: name, url: `/uploads/${category}/${name}` };
   });

   res.json({ message: "Հաջողություն", files: saved });
});

// GET IMAGES BY CATEGORY
app.get("/admin/get-images-by", (req, res) => {
   const dir = path.join(__dirname, "uploads");
   if (!fs.existsSync(dir)) return res.json({ imagesBy: {} });

   const imagesBy = {};
   fs.readdirSync(dir).forEach(cat => {
      const catDir = path.join(dir, cat);
      if (fs.lstatSync(catDir).isDirectory()) {
         imagesBy[cat] = fs.readdirSync(catDir).map(f => ({
            category: cat,
            filename: f,
            url: `${req.protocol}://${req.get("host")}/uploads/${cat}/${f}`
         }));
      }
   });
   res.json({ imagesBy });
});

// GET CATEGORIES
app.get("/admin/categories", (req, res) => {
   const dir = path.join(__dirname, "uploads");
   if (!fs.existsSync(dir)) return res.json({ categories: [] });
   const cats = fs.readdirSync(dir).filter(d => fs.lstatSync(path.join(dir, d)).isDirectory());
   res.json({ categories: cats });
});

// ADD CATEGORY
app.post("/admin/add-category", (req, res) => {
   const { category } = req.body;
   if (!category?.trim()) return res.status(400).json({ message: "Անվավեր անուն" });
   const dir = path.join(__dirname, "uploads", category.trim());
   if (fs.existsSync(dir)) return res.status(400).json({ message: "Գոյություն ունի" });
   fs.mkdirSync(dir, { recursive: true });
   res.json({ message: "Ստեղծվել է" });
});

// DELETE IMAGE
app.delete("/admin/delete/:category/:filename", (req, res) => {
   const { category, filename } = req.params;
   const file = path.join(__dirname, "uploads", category, filename);
   if (!fs.existsSync(file)) return res.status(404).json({ message: "Չի գտնվել" });
   fs.unlinkSync(file);
   res.json({ message: "Ջնջված է" });
});

app.use((err, req, res, next) => {
   if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
   }
   res.status(500).json({ message: "Սերվերի սխալ" });
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));