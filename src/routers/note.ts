import express from "express";

import { registerNote, getNote, getAllNotes, updateNote, deleteNote } from "../controllers/note";
import { tokenAuth } from "../middleware/index";

export default (router: express.Router) => {
    router.get("/", (req: express.Request, res: express.Response) => {
        res.send("Sari Backend")
    })
    router.post("/registerNote/:id", tokenAuth, registerNote);
    router.get("/getNote/:userId/:noteId", tokenAuth, getNote);
    router.get("/getAllNotes/:userId", tokenAuth, getAllNotes);
    router.patch("/updateNote/:userId/:noteId", tokenAuth, updateNote);
    router.delete("/deleteNote/:userId/:noteId", tokenAuth, deleteNote);
}