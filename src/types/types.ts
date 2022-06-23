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
	isFavourite: boolean,
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
	noteIsFavourite: boolean,
};

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

export type HeaderProps = {
	activePage: string,
	pageLabel: React.ReactElement,
	notesUnavailable: boolean,
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void
};

export type BaseComponentProps = {
	activePage: string,
	pageLabel: React.ReactElement,
	notesUnavailableClass?: string,
	notesUnavailableInfo: string,
	notesUnavailableIcon: React.ReactElement,
	notes: NoteType[]
};

export type NoteDialogProps = {
	activePage: string,
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void
};

export type NoteContentProps = {
	activePage: string,
	onHideFontAndPalette: () => void
};

export type NoteOptionsProps = {
	activePage: string,
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void,

	fontAndPaletteVisibility: {
		fontSelect: boolean,
		palette: boolean
	},

	onUpdateFontAndPalette: (value: {
		fontSelect: boolean,
		palette: boolean
	}) => void
};

export type ConfirmDeleteProps = {
	deleteConfirmVisible: boolean,
	deleteAmount: string,
	onShowDeleteConfirm: (value: boolean) => void
};

export type ArrowDownIconProps = {
	style: string
};
