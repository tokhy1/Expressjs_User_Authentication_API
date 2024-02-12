const express = require("express");
const router = express.Router();
const authController = require("../../controllers/userController");
const passport = require("passport");
const isAuthenticated = require("../../middlewares/isAuthenticated");

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.get('/status', authController.status);
router.post('/logout', isAuthenticated, authController.logout);

module.exports = router;