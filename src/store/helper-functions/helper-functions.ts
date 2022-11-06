import { NoteType } from "../../types/types";

export function findNote(notes: NoteType[], noteId: string) {
	const noteFound = notes.find((note) => note.id === noteId);
	return noteFound;
}

export function filterNotes(notes: NoteType[], noteId: string): NoteType[] {
	const filteredNotes = notes.filter((note) => note.id !== noteId);
	return filteredNotes;
}

export function filterFavourites(notes: NoteType[]): NoteType[] {
	const favouriteNotes = notes.filter((note) => note.isFavourite);
	return favouriteNotes;
}
