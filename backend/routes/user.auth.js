const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();

router.post("/signup"), async (req, res) => {};
router.post("/login"), async (req, res) => {};

module.exports = router;
