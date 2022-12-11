export type ThemeType = {
	colour: string,
	isGradient: boolean
};

export type NoteType = {
	id: string,
	title: string,
	text: string,
	images: string[],
	theme: ThemeType,
	font: string,
	isFavourite: boolean
};

export type InitialState = {
	savedNotes: NoteType[],
	trashedNotes: NoteType[],
	isNoteEmpty: boolean,
	isNoteNew: boolean,
	isNoteDialogVisible: boolean,
	noteId: string,
	noteTitle: string,
	noteText: string,
	noteImages: string[],
	noteTheme: ThemeType,
	noteFont: string,
	noteIsFavourite: boolean
};

export type VisibleElements = {
	fontSelect: boolean,
	themePalette: boolean
};
