const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Fetchuser = require("../Middleware/Fetchuser");
const Note = require("../Models/Note");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getNotes". Login required
router.get("/getNotes", Fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a note using: POST "/api/notes/addNote" / Login required
router.post(
  "/addnote",
  Fetchuser,
  [
    body("Title", "Enter a Valid Title").isLength({ min: 1 }),
    body("description", "Description atleast 5 characters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { Title, description, tag } = req.body;
      const note = new Note({
        Title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error, "Internal Server Error");
    }
  }
);

// ROUTE 2: Update a note using: PUT "/api/notes/updatenote" / Login required
router.put("/updatenote/:id", Fetchuser, async (req, res) => {
  const { Title, description, tag } = req.body;

  // Create a New Notes
  try {
    const newNote = {};
    if (Title) {
      newNote.Title = Title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found ");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Down");
  }
});

// ROUTE 2: Delete a note using: DELETE "/api/notes/deletenote" / Login required
router.delete("/deletenotes/:id", Fetchuser, async (req, res) => {
  try {
    // Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found ");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note Has Been Deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Down");
  }
});

module.exports = router;
