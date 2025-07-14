import express from "express";
import {
  getAllManuals,
  uploadManual,
  getManualById,
} from "../controllers/manualController.js";
import { upload } from "../Middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllManuals);
router.get("/:id", getManualById);
// manualRoutes.js
router.post(
  "/upload",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  uploadManual
);

export default router;
