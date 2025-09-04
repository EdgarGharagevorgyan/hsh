const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
   destination: "./uploads",
   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
   },
});
const upload = multer({ storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
   res.send("Backend running!");
});

app.post("/api/upload", upload.single("image"), (req, res) => {
   res.json({
      filename: req.file.filename,
      url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
   });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
