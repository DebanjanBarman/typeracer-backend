const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch(
  "/update/:id",
  authController.protect,
  authController.profileUpdate
);
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/imgs"));
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const extension = file.originalname.split(".")[1];
    const filename = Date.now() + "_" + id + "." + extension;
    file["filename"] = filename;
    callback(null, filename);
  },
});

const upload = multer({ storage });
router.patch(
  "/uploadpic/:id",
  upload.single("file"),
  authController.protect,
  authController.uploadProfilePicture
);

module.exports = router;
