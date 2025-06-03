const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Enable CORS so frontend can talk to backend
app.use(cors());
app.use(express.json());

// Set up multer for image uploads
const storage = multer.diskStorage({
   destination: "./uploads",
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
   },
});
const upload = multer({ storage });

// Make uploaded files publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Simple test route
app.get("/", (req, res) => {
   res.send("Backend running!");
});

// Route to upload images
app.post("/api/upload", upload.single("image"), (req, res) => {
   res.json({
      filename: req.file.filename,
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
   });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
