import { InitialState } from "../../types/types";

export const initialState: InitialState = {
	userNotes: [],
	favouriteNotes: [],
	trashedNotes: [],
	isNoteEmpty: true,
	isNoteNew: true,
	isNoteDialogVisible: false,
	noteId: "",
	noteTitle: "",
	noteContent: "",
	noteImages: [],
	noteTheme: "dark",
	noteFont: "glacial",
	noteIsFavourite: false,
	noteThemeIsGradient: false
};
