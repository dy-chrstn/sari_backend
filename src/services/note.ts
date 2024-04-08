import { NoteModel } from "../models/note";

export const createNote = async (data: any) => {
    try {
        return await new NoteModel(data).save();
    } catch (error) {
        return console.log(error);
    }
}

export const findNoteById = async (noteId: string) => {
    try {
        return await NoteModel.findOne({ _id: noteId });
    } catch (error) {
        return console.log(error);
    }
}

export const findAllNotesById = async (userId: string) => {
    try {
        return await NoteModel.find({ userId: userId });
    } catch (error) {
        return console.log(error);
    }
}

export const updateNoteById = async (noteId: string, data: any) => {
    try {
        return await NoteModel.findOneAndUpdate({ _id: noteId }, data, { new: true });
    } catch (error) {
        return console.log(error);
    }
}

export const deleteNoteById = async (noteId: string) => {
    try {
        return await NoteModel.findOneAndDelete({ _id: noteId });
    } catch (error) {
        return console.log(error);
    }
}