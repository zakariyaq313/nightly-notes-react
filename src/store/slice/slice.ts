import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteType } from "../../types/types";
import { filterNotes, findNote } from "../helper-functions/helper-functions";
import { initialState } from "../initial-state/initial-state";

export const noteStateSlice = createSlice({
	name: "Notes",
	initialState: initialState,
	reducers: {
		noteDialogIsVisible(state, action: PayloadAction<boolean>) {
			state.isFormVisible = action.payload;
		},

		noteIsEmpty(state, action: PayloadAction<boolean>) {
			state.isNoteEmpty = action.payload;
		},

		noteIsNew(state, action: PayloadAction<boolean>) {
			state.isNoteNew = action.payload;
		},

		noteThemeIsGradient(state, action: PayloadAction<boolean>) {
			state.isThemeGradient = action.payload;
		},

		setNoteTitle(state, action: PayloadAction<string>) {
			state.noteTitle = action.payload;
		},

		setNoteContent(state, action: PayloadAction<string>) {
			state.noteContent = action.payload;
		},

		setNoteImages(state, action: PayloadAction<string>) {
			state.noteImages.push(action.payload);
		},

		setNoteTheme(state, action: PayloadAction<string>) {
			state.noteTheme = action.payload;
		},

		setNoteFont(state, action: PayloadAction<string>) {
			state.noteFont = action.payload;
		},

		setNoteFavourite(state) {
			state.noteIsFavourite = !state.noteIsFavourite;
		},

		createOrTrash(state, action: PayloadAction<string>) {			
			const notes = [];
			notes.push({
				id: new Date().toISOString(),
				title: state.noteTitle,
				content: state.noteContent,
				images: state.noteImages,
				theme: state.noteTheme,
				font: state.noteFont,
				isFavourite: state.noteIsFavourite
			});

			if (action.payload === "create") {
				state.userNotes = [...notes, ...state.userNotes];
			} else if(action.payload === "trash"){
				state.trashedNotes = [...notes, ...state.trashedNotes];
			}
		},

		editNote(state, action: PayloadAction<NoteType>) {
			state.noteId = action.payload.id;
			state.noteTitle = action.payload.title;
			state.noteContent = action.payload.content;
			state.noteImages = action.payload.images;
			state.noteTheme = action.payload.theme;
			state.noteFont = action.payload.font;
			state.noteIsFavourite = action.payload.isFavourite;
		},

        updateNote(state) {
			const noteFound = findNote(state.userNotes, state.noteId);

			Object.assign(noteFound, {
				title: state.noteTitle,
				content: state.noteContent,
				images: state.noteImages,
				theme: state.noteTheme,
				font: state.noteFont,
				isFavourite: state.noteIsFavourite
			});
		},

		resetNote(state) {
			state.noteId = "";
			state.noteTitle = "";
			state.noteContent = "";
			state.noteImages = [];
			state.noteTheme = "dark";
			state.noteFont = "roboto";
			state.noteIsFavourite = false;
		},

		trashNote(state) {
			const noteToTrash = findNote(state.userNotes, state.noteId);
			if (noteToTrash) {
				state.trashedNotes.unshift(noteToTrash);
				state.userNotes = filterNotes(state.userNotes, state.noteId);	
			}
		},

        restoreNote(state) {
			const noteFound = findNote(state.trashedNotes, state.noteId);

			if (noteFound) {
				state.userNotes.unshift(noteFound);
				state.trashedNotes = filterNotes(state.trashedNotes, noteFound.id);
			}
		},

        deleteImages(state, action: PayloadAction<number>) {
			state.noteImages.splice(action.payload, 1);
		},

		deleteEmptyNote(state) {
			state.userNotes = filterNotes(state.userNotes, state.noteId);
		},

        deleteNotesForever(state, action: PayloadAction<string>) {
			if (action.payload === "one") {
				state.trashedNotes = filterNotes(state.trashedNotes, state.noteId);
			} else if (action.payload === "all") {
				state.trashedNotes = [];
			}
		},

        addFavouriteNotes(state) {
			state.favouriteNotes = state.userNotes.filter(note => note.isFavourite);
		}
	}
})
