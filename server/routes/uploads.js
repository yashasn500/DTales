const { Router } = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const path = require("path");
const fs = require("fs");

const router = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
const docsDir = path.join(__dirname, "../uploads/docs");
const imagesDir = path.join(__dirname, "../uploads/images");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp + original extension
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${timestamp}${ext}`;
    cb(null, filename);
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
});

/**
 * POST /api/uploads/image
 * Upload a single image file
 * Returns { url: "/uploads/filename.ext" }
 */
router.post("/image", (req, res) => {
  const uploadHandler = upload.single("image");
  
  uploadHandler(req, res, (err) => {
    if (err) {
      console.error("MULTER ERROR:", err);
      return res.status(400).json({ error: err.message || "Failed to upload image" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    return res.status(201).json({ url: imageUrl });
  });
});

/**
 * POST /api/uploads/docx
 * Upload a .docx file and convert to HTML
 * Returns { content: "<html>...</html>" }
 */
const docxStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, docsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  },
});

const docxFileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];
  if (allowedMimes.includes(file.mimetype) || file.originalname.endsWith(".docx")) {
    cb(null, true);
  } else {
    cb(new Error("Only .docx files are allowed"), false);
  }
};

const uploadDocx = multer({
  storage: docxStorage,
  fileFilter: docxFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
});

router.post("/docx", (req, res) => {
  const uploadHandler = uploadDocx.single("contentFile");

  uploadHandler(req, res, async (err) => {
    if (err) {
      console.error("DOCX UPLOAD ERROR:", err);
      return res.status(400).json({ error: err.message || "Failed to upload .docx file" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No .docx file provided" });
    }

    const docxPath = req.file.path;

    try {
      // Convert .docx to HTML with image handling
      const result = await mammoth.convertToHtml(
        { path: docxPath },
        {
          convertImage: mammoth.images.imgElement(async (image) => {
            // Extract image buffer
            const buffer = await image.read();
            
            // Generate unique filename for extracted image
            const timestamp = Date.now();
            const extension = image.contentType.split("/")[1] || "png";
            const imageName = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;
            const imagePath = path.join(imagesDir, imageName);

            // Save image to uploads/images directory
            fs.writeFileSync(imagePath, buffer);

            // Return public URL for image
            return { src: `/uploads/images/${imageName}` };
          }),
        }
      );

      // Clean up uploaded .docx file
      fs.unlinkSync(docxPath);

      // Return HTML content
      return res.status(200).json({ content: result.value });
    } catch (parseErr) {
      console.error("DOCX PARSE ERROR:", parseErr);
      // Clean up file on error
      if (fs.existsSync(docxPath)) {
        fs.unlinkSync(docxPath);
      }
      return res.status(500).json({ error: "Failed to parse .docx file" });
    }
  });
});

module.exports = router;
