const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs").promises;
const cloudinary = require("cloudinary").v2;

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No Image file Found" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log(error);
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({
      success: false,
      error: "Image upload failed",
      message: error.message,
    });
  }
});
