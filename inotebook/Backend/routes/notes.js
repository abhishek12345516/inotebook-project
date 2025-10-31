const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// 🟢 ROUTE 1: Get all notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("❌ Error in /fetchallnotes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 🟢 ROUTE 2: Add a new note using POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("❌ Error in /addnote:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// 🟢 ROUTE 3: Update an existing note using PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // Allow update only if user owns this note
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error("❌ Error in /updatenote:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 🟢 ROUTE 4: Delete an existing note using DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    // Allow delete only if user owns this note
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "Note deleted successfully", note });
  } catch (error) {
    console.error("❌ Error in /deletenote:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
