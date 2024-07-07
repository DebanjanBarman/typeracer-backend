const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.protect, eventController.registerEvent);

router.post("/", authController.protect, authController.authorizeAdmin, eventController.createEvent);
router.patch("/:id", authController.protect, authController.authorizeAdmin, eventController.updateEvent);
router.delete("/:id", authController.protect, authController.authorizeAdmin, eventController.deleteEvent);
router.get("/:id", eventController.getEvent);
router.get("/", eventController.getEvents);

module.exports = router;
