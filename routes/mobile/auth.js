const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const mobileAuth = require("../../middleware/mobileauth");

const stationDBHelper = require("../../services/stationDBHelper");
const encHandler = require("../../middleware/encryptionHandler");

// Sign In Route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { registrationNo, password } = req.body;

    const user = await stationDBHelper.findStationByRegNo(registrationNo);
    if (user !== null) {
      let password_check = await encHandler.checkEncryptedCredential(
        password,
        user.password
      );

      if (password_check) {
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc });
      } else {
        res.status(400).json({
          status: "error",
          error: "Authentication error!",
        });
      }
    } else {
      res.status(400).json({
        status: "error",
        error: "Authentication error!",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await stationDBHelper.findStationByID(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/", mobileAuth, async (req, res) => {
  const user = await stationDBHelper.findStationByID(req.user); 
  res.json({ ...user._doc, token: req.token }); 
});

module.exports = authRouter;
