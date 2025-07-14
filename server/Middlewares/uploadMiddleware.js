// uploadMiddleware.js
import multer from "multer";
import path from "path";

// Utility to sanitize strings for safe filenames
const sanitize = (str) =>
  str
    .replace(/[\\/:"*?<>|]+/g, "") // Remove illegal characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .toLowerCase(); // Optional: normalize to lowercase

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const title = req.body.title || "manual";
    const sanitizedTitle = sanitize(title);
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}-${sanitizedTitle}-${file.fieldname}${ext}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only PDF, PNG, or JPG files allowed"), false);
    }
    cb(null, true);
  },
});
