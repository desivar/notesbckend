import Note from "../models/note.model.js";
import { StatusCodes } from "http-status-codes";

// CREATE new note
export const handleCreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      title,
      content,
      user: req.user._id, // Assuming you have user authentication middleware
    });

    const savedNote = await newNote.save();

    res.status(StatusCodes.CREATED).json({ message: "Note created successfully", note: savedNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to create note" });
  }
};

// GET all notes
export const handleGetAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(StatusCodes.OK).json({ notes });
  } catch (error) {
    console.error("Error fetching all notes:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch notes" });
  }
};

// GET note by ID
export const handleGetNoteById = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found" });
    }

    // Ensure the note belongs to the logged-in user (if applicable)
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Not authorized to view this note" });
    }

    res.status(StatusCodes.OK).json({ note });
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch note" });
  }
};

// UPDATE a note
export const handleUpdateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found" });
    }

    // Ensure the note belongs to the logged-in user (if applicable)
    if (updatedNote.user.toString() !== req.user._id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Not authorized to update this note" });
    }

    res.status(StatusCodes.OK).json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to update note" });
  }
};

// DELETE a note
export const handleDeleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found" });
    }

    // Ensure the note belonged to the logged-in user (if applicable)
    if (deletedNote.user.toString() !== req.user._id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Not authorized to delete this note" });
    }

    res.status(StatusCodes.OK).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete note" });
  }
};

// RENDER edit note form (assuming you might have a frontend)
export const handleRenderEditNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found" });
    }

    // Ensure the note belongs to the logged-in user (if applicable)
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Not authorized to edit this note" });
    }

    res.status(StatusCodes.OK).json({ note }); // Or render a view if you have one
  } catch (error) {
    console.error("Error fetching note for edit:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch note for editing" });
  }
};