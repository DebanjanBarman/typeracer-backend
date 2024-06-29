const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.authorizeAdmin,
  eventController.createEvent
);
router.patch(
  "/",
  authController.protect,
  authController.authorizeAdmin,
  eventController.updateEvent
);
router.delete(
  "/",
  authController.protect,
  authController.authorizeAdmin,
  eventController.deleteEvent
);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);

module.exports = router;
