import express from "express";

import { registerNote, getNote, getAllNotes, updateNote, deleteNote } from "../controllers/note";
import { tokenAuth } from "../middleware/index";

export default (router: express.Router) => {
    router.post("/note/register/:id", tokenAuth, registerNote);
    router.get("/note/get/:userId/:noteId", tokenAuth, getNote);
    router.get("/note/getAll/:userId", tokenAuth, getAllNotes);
    router.patch("/note/update/:userId/:noteId", tokenAuth, updateNote);
    router.delete("/note/delete/:userId/:noteId", tokenAuth, deleteNote);
}