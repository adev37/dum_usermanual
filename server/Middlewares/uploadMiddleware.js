// uploadMiddleware.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const sanitizedTitle = req.body.title?.replace(/\s+/g, "-") || "manual";
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
