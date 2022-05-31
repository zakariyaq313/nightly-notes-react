import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { noteActions, RootState } from "../store";

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const exitNote = (page: string): AppThunk => {
	return (dispatch, getState) => {
		if (page !== "trash") {			
			if (getState().isNoteNew) {
				if (!getState().isNoteEmpty) {					
					dispatch(noteActions.createOrTrash("create"));
				}
			} else {				
				if (!getState().isNoteEmpty) {
					dispatch(noteActions.updateNote());
				} else {
					dispatch(noteActions.deleteEmptyNote());
				}
			}

			dispatch(noteActions.addFavouriteNotes());
		}
	
		dispatch(noteActions.resetNote());
		dispatch(noteActions.noteDialogIsVisible(false));
	}
}

export const moveToTrash = () : AppThunk => {
	return (dispatch, getState) => {
		if (getState().isNoteNew) {
			dispatch(noteActions.createOrTrash("trash"));
		} else {
			dispatch(noteActions.updateNote());
			dispatch(noteActions.trashNote());
		}

		dispatch(noteActions.resetNote());
		dispatch(noteActions.addFavouriteNotes());
		dispatch(noteActions.noteDialogIsVisible(false));
	}
}

export const restoreFromTrash = (): AppThunk => {
    return dispatch => {
	    dispatch(noteActions.restoreNote());
	    dispatch(noteActions.resetNote());
	    dispatch(noteActions.noteDialogIsVisible(false));
	    dispatch(noteActions.addFavouriteNotes());
    }
}

// export const emptyTrash = (): AppThunk => {
//     return dispatch => {
// 	    dispatch(noteActions.deleteNotes("delete-all"));
//     }
// }
