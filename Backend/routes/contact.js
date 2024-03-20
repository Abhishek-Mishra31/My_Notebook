const express = require("express");
const router = express.Router();
const contact = require("../Models/Contact");
const { body, validationResult } = require("express-validator");

router.post(
  "/sendContact",
  [
    body("name", "Enter a Valid Name"),
    body("email", "Enter a Valid Email").isEmail(),
    body("review", "review atleast 15 characters "),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, review } = req.body;
      let cdata = new contact({
        name,
        email,
        review,
      });
      const savedData = await cdata.save();
      res.json(savedData);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
