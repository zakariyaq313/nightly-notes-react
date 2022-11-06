import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState, noteActions } from "../store";
import { NoteType } from "../../types/types";

type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;

const {
	createOrTrash,
	deleteEmptyNote,
	deleteNotesForever,
	editNoteContent,
	noteDialogIsVisible,
	noteIsNew,
	resetNoteContent,
	restoreNote,
	trashNote,
	updateNoteContent
} = noteActions;

export function exitNoteDialog(page: string): AppThunk {
	return (dispatch, getState) => {
		if (page !== "trash") {
			// If a new note is being created and it is not empty
			if (getState().isNoteNew && !getState().isNoteEmpty) {
				dispatch(createOrTrash("create"));

			// If an existing note is edited/updated
			} else if(!getState().isNoteNew && !getState().isNoteEmpty) {
				dispatch(updateNoteContent());

			// If all the content of an existing note is removed
			} else if(!getState().isNoteNew && getState().isNoteEmpty) {
				dispatch(deleteEmptyNote());
			}
		}

		dispatch(resetNoteContent());
		dispatch(noteDialogIsVisible(false));
	}
}

export function editNote(noteContent: NoteType): AppThunk {
	return (dispatch) => {
		dispatch(editNoteContent(noteContent));
		dispatch(noteDialogIsVisible(true));
		dispatch(noteIsNew(false));
	}
}

export function moveToTrash(): AppThunk {
	return (dispatch, getState) => {
		if (getState().isNoteNew) {
			dispatch(createOrTrash("trash"));
		} else {
			dispatch(updateNoteContent());
			dispatch(trashNote());
		}

		dispatch(resetNoteContent());
		dispatch(noteDialogIsVisible(false));
	}
}

export function restoreFromTrash(): AppThunk {
    return (dispatch) => {
	    dispatch(restoreNote());
	    dispatch(resetNoteContent());
	    dispatch(noteDialogIsVisible(false));
    }
}

export function deleteFromTrash(amount: string): AppThunk {
	return (dispatch) => {
		dispatch(deleteNotesForever(amount));
		dispatch(resetNoteContent());
		dispatch(noteDialogIsVisible(false));
	}
}
