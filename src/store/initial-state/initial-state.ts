import { InitialState } from "../../types/types";

export const initialState: InitialState = {
	userNotes: [],
	favouriteNotes: [],
	trashedNotes: [],
	isNoteEmpty: true,
	isNoteNew: true,
	isFormVisible: false,
	isThemeGradient: false,
	noteId: "",
	noteTitle: "",
	noteContent: "",
	noteImages: [],
	noteTheme: "dark",
	noteFont: "roboto",
	noteIsFavourite: false
};
