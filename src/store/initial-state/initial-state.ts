import { InitialState } from "../../types/types";

export const initialState: InitialState = {
	savedNotes: [],
	trashedNotes: [],
	isNoteEmpty: true,
	isNoteNew: true,
	isNoteDialogVisible: false,
	noteId: "",
	noteTitle: "",
	noteText: "",
	noteImages: [],
	noteTheme: {colour: "dark", isGradient: false},
	noteFont: "glacial",
	noteIsFavourite: false,
};
