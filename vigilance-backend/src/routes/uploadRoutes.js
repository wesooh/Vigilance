import express from "express";

import {
  uploadProfilePicture,
  uploadIDPhoto,
  uploadCV,
  uploadCertificate,
  uploadPortfolio,
} from "../controllers/uploadController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../config/multer.js";

const router = express.Router();

router.post(
  "/profile-picture",
  protect,
  upload.single("file"),
  uploadProfilePicture
);

router.post(
  "/id-photo",
  protect,
  upload.single("file"),
  uploadIDPhoto
);

router.post(
  "/cv",
  protect,
  upload.single("file"),
  uploadCV
);

router.post(
  "/certificate",
  protect,
  upload.single("file"),
  uploadCertificate
);

router.post(
  "/portfolio",
  protect,
  upload.single("file"),
  uploadPortfolio
);

export default router;