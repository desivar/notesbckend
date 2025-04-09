import express from "express";
import {
  handleCreateNote,
  handleDeleteNote,
  handleGetAllNotes,
  handleGetNoteById,
  handleUpdateNote,
  handleRenderEditNote,
} from "../controllers/notes.controllers.js";
import { authenticated } from "../middlewares/authenticated.js";
import { setAuthStatus } from "../middlewares/setAuthStatus.js";

const router = express.Router();

// GET ALL NOTES        /notes
router.get("/", authenticated, setAuthStatus, handleGetAllNotes);

// CREATE NEW NOTES     /notes/create
router.post("/create", authenticated, handleCreateNote);

//  GET NOTE BY ID       /notes/:noteId
router.get("/:noteId", authenticated, handleGetNoteById);

//  DELETE A NOTE        /notes/delete/:noteId
router.get("/delete/:noteId", authenticated, handleDeleteNote);

//  UPDATE A NOTE        /notes/edit/:noteId
router.get("/edit/:noteId", authenticated, handleRenderEditNote);

//  UPDATE A NOTE        /notes/edit/:noteId
router.post("/edit/:noteId", authenticated, handleUpdateNote);

export default router;