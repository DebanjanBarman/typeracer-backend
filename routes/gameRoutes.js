const express = require("express");
const gameController = require("../controllers/gameController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post('/',
    authController.protect,
    authController.authorizeAdmin,
    gameController.createGame
);
router.patch('/',
    authController.protect,
    authController.authorizeAdmin,
    gameController.updateGame
)
router.delete('/',
    authController.protect,
    authController.authorizeAdmin,
    gameController.deleteGame
)
router.get("/participation",
    authController.protect,
    gameController.checkParticipation
);
router.get("/", gameController.getGames);
router.get("/my-games", authController.protect, gameController.getMyGames);
router.get("/my-games/:id", authController.protect, gameController.getMyGame);
router.get("/:id", authController.protect, gameController.getGame);

module.exports = router;
