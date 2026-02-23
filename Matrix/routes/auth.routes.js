const express = require("express");
const router = express.Router();

const {
    loginPage,
    loginData,
    forgotPasswordPage,
    forgotPassword,
    resetPasswordPage,
    resetPassword
} = require("../controller/auth.controller");


// Login Page
router.get("/login", loginPage);
router.post("/login", loginData);


// Forgot Password
router.get("/forgot-password", forgotPasswordPage);
router.post("/forgot-password", forgotPassword);


// Reset Password
router.get("/reset-password/:token", resetPasswordPage);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
