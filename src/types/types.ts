import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

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
	userNotes: NoteType[],
	favouriteNotes: NoteType[],
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

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

export type ElementsVisible = {
	fontSelect: boolean,
	themePalette: boolean
};
