// manualRoutes.js
import express from "express";
import {
  getAllManuals,
  uploadManual,
  getManualById,
} from "../controllers/manualController.js";
import { upload } from "../Middlewares/uploadMiddleware.js";

const router = express.Router();

// GET all manuals
router.get("/", getAllManuals);

// GET manual by ID
router.get("/:id", getManualById);

// POST: Upload manual with PDF and image files
router.post(
  "/upload",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  uploadManual
);

export default router;
