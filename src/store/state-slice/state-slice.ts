import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteType, ThemeType } from "../../types/types";
import { filterNotes, findNote } from "../helper-functions/helper-functions";
import { initialState } from "../initial-state/initial-state";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: initialState,
	reducers: {
		noteDialogIsVisible(state, action: PayloadAction<boolean>) {
			state.isNoteDialogVisible = action.payload;
		},
		noteIsEmpty(state, action: PayloadAction<boolean>) {
			state.isNoteEmpty = action.payload;
		},
		noteIsNew(state, action: PayloadAction<boolean>) {
			state.isNoteNew = action.payload;
		},
		setNoteTitle(state, action: PayloadAction<string>) {
			state.noteTitle = action.payload;
		},
		setNoteText(state, action: PayloadAction<string>) {
			state.noteText = action.payload;
		},
		addNoteImages(state, action: PayloadAction<string>) {
			state.noteImages.push(action.payload);
		},
		setNoteTheme(state, action: PayloadAction<ThemeType>) {
			state.noteTheme = action.payload;
		},
		setNoteFont(state, action: PayloadAction<string>) {
			state.noteFont = action.payload;
		},
		setNoteFavourite(state) {
			state.noteIsFavourite = !state.noteIsFavourite;
		},
		createOrTrash(state, action: PayloadAction<string>) {
			const newNote: NoteType = {
				id: new Date().toISOString(),
				title: state.noteTitle.trim(),
				text: state.noteText,
				images: state.noteImages,
				theme: state.noteTheme,
				font: state.noteFont,
				isFavourite: state.noteIsFavourite,
			};

			if (action.payload === "create") {
				state.savedNotes.unshift(newNote);
			} else if(action.payload === "trash"){
				state.trashedNotes.unshift(newNote);
			}
		},
		editNoteContent(state, action: PayloadAction<NoteType>) {
			const {id, title, text, images, theme, font, isFavourite} = action.payload;
			state.noteId = id;
			state.noteTitle = title;
			state.noteText = text;
			state.noteImages = images;
			state.noteTheme = theme;
			state.noteFont = font;
			state.noteIsFavourite = isFavourite;
		},
        updateNoteContent(state) {
			const noteToUpdate = findNote(state.savedNotes, state.noteId)!;
			Object.assign(noteToUpdate, {
				title: state.noteTitle.trim(),
				text: state.noteText,
				images: state.noteImages,
				theme: state.noteTheme,
				font: state.noteFont,
				isFavourite: state.noteIsFavourite,
			});
		},
		resetNoteContent(state) {
			state.noteId = "";
			state.noteTitle = "";
			state.noteText = "";
			state.noteImages = [];
			state.noteTheme.colour = "dark";
			state.noteTheme.isGradient = false;
			state.noteFont = "glacial";
			state.noteIsFavourite = false;
		},
		trashNote(state) {
			const noteToTrash = findNote(state.savedNotes, state.noteId)!;
			state.trashedNotes.unshift(noteToTrash);
			state.savedNotes = filterNotes(state.savedNotes, noteToTrash.id);
		},
        restoreNote(state) {
			const noteToRestore = findNote(state.trashedNotes, state.noteId)!;
			state.savedNotes.unshift(noteToRestore);
			state.trashedNotes = filterNotes(state.trashedNotes, noteToRestore.id);
		},
        deleteNoteImages(state, action: PayloadAction<number>) {
			state.noteImages.splice(action.payload, 1);
		},
		deleteEmptyNote(state) {
			state.savedNotes = filterNotes(state.savedNotes, state.noteId);
		},
        deleteNotesForever(state, action: PayloadAction<string>) {
			if (action.payload === "one") {
				state.trashedNotes = filterNotes(state.trashedNotes, state.noteId);
			} else if (action.payload === "all") {
				state.trashedNotes = [];
			}
		}
	}
})
