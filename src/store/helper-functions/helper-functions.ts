import { NoteType } from "../../types/types";

export const findNote = (notes: NoteType[], noteId: string) => {
	const noteFound = notes.find(note => note.id === noteId);
	return noteFound;
}

export const filterNotes = (notes: NoteType[], noteId: string) => {
	const filteredNotes = notes.filter(note => note.id !== noteId);
	return filteredNotes;
}
