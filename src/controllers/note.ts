import express from "express";

import {
  createNote,
  findNoteById,
  findAllNotesById,
  updateNoteById,
  deleteNoteById,
} from "../services/note";
import { findUserById } from "../services/user";

export const registerNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;
    const { title, content, createdBy, updatedBy } = req.body;

    const userExists = await findUserById(userId);
    if (!userExists) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

    const noteData = {
      userId,
      title,
      content,
      createdBy,
      updatedBy,
    };

    const note = await createNote(noteData);
    return res.status(200).json({
      messages: {
        code: 0,
        message: "Note created",
      },
      response: note,
    });
  } catch (error) {
    return res.status(500).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
};

export const getNote = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const userExists = await findUserById(userId);
    if (!userExists) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

    const note = await findNoteById(noteId);
    return res.status(200).json({
      messages: {
        code: 0,
        message: "Note found",
      },
      response: note,
    });
  } catch (error) {
    return res.status(500).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
};

export const getAllNotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.userId;

    const userExists = await findUserById(userId);
    if (!userExists) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

    const notes = await findAllNotesById(userId);
    return res.status(200).json({
      messages: {
        code: 0,
        message: "Notes retrieved",
      },
      response: notes,
    });
  } catch (error) {
    return res.status(500).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
};

export const updateNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;
    const { title, content, createdBy, updatedBy } = req.body;

    const userExists = await findUserById(userId);
    if (!userExists) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {}, 
      });
    }

    const note = await updateNoteById(noteId, {
      title,
      content,
      createdBy,
      updatedBy,
    });

    if (!note) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "Note not found",
        },
        response: {},
      });
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "Note updated",
      },
      response: note,
    });
  } catch (error) {
    return res.status(500).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
};

export const deleteNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const userExists = await findUserById(userId);
    if (!userExists) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

    const note = await deleteNoteById(noteId);
    return res.status(200).json({
      messages: {
        code: 0,
        message: "Note deleted",
      },
      response: note,
    });

  } catch (error) {
    return res.status(500).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
}