import { AppThunk, NoteType } from "../../types/types";
import { noteActions } from "../store";

export const exitNote = (page: string): AppThunk => {
	return (dispatch, getState) => {
		if (page !== "trash") {			
			if (getState().isNoteNew) {
				if (!getState().isNoteEmpty) {					
					dispatch(noteActions.createOrTrash("create"));
				}
			} else {				
				if (!getState().isNoteEmpty) {
					dispatch(noteActions.updateNoteContent());
				} else {
					dispatch(noteActions.deleteEmptyNote());
				}
			}

			dispatch(noteActions.addFavouriteNotes());
		}

		dispatch(noteActions.resetNoteContent());	
		dispatch(noteActions.noteDialogIsVisible(false));
	}
}

export const editNote = (noteContent: NoteType): AppThunk => {
	return (dispatch) => {
		dispatch(noteActions.editNoteContent(noteContent));
		dispatch(noteActions.noteDialogIsVisible(true));
		dispatch(noteActions.noteIsNew(false));
	}
}

export const moveToTrash = (): AppThunk => {
	return (dispatch, getState) => {
		if (getState().isNoteNew) {
			dispatch(noteActions.createOrTrash("trash"));
		} else {
			dispatch(noteActions.updateNoteContent());
			dispatch(noteActions.trashNote());
		}

		dispatch(noteActions.resetNoteContent());
		dispatch(noteActions.addFavouriteNotes());
		dispatch(noteActions.noteDialogIsVisible(false));
	}
}

export const restoreFromTrash = (): AppThunk => {
    return (dispatch) => {
	    dispatch(noteActions.restoreNote());
	    dispatch(noteActions.resetNoteContent());
	    dispatch(noteActions.noteDialogIsVisible(false));
	    dispatch(noteActions.addFavouriteNotes());
    }
}

export const deleteFromTrash = (amount: string): AppThunk => {
	return (dispatch) => {
		dispatch(noteActions.deleteNotesForever(amount));
		dispatch(noteActions.resetNoteContent());
		dispatch(noteActions.noteDialogIsVisible(false));
	}
}
