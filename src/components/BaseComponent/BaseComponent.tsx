import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { noteActions, RootState, useThunkDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { exitNote } from "../../store/action-creators/action-creators";
import { BaseComponentProps } from "../../types/types";
import Header from "../UIComponents/Header";
import Note from "../Note/Note";
import NoteDialog from "../NoteDialog/NoteDialog";
import ConfirmDelete from "../UIComponents/ConfirmDelete";
import "../../styles/base-component/base-component.scss";

function BaseComponent(props: BaseComponentProps): JSX.Element {
	const {
		notes,
		activePage,
		pageLabel,
		notesUnavailableClass,
		notesUnavailableInfo,
		notesUnavailableIcon
	} = props;

	const {
		isNoteDialogVisible,
		noteTheme,
	} = useSelector((state: RootState) => state);

	const dispatch = useDispatch();
	const thunkDispatch = useThunkDispatch();
	
	const [notesUnavailable, setNotesUnavailable] = useState(true);
	const [overlayClasses, setOverlayClasses] = useState("");
	const [blurOverlayClasses, setBlurOverlayClasses] = useState("");
	const [deleteConfirmVisible, setDeleteConfirmVisibility] = useState(false);
	const [deleteAmount, setDeleteAmount] = useState("");

	const closeNoteDialog = () => {
		thunkDispatch(exitNote(activePage));
	}

	const showNoteDialog = () => {
		dispatch(noteActions.noteDialogIsVisible(true));
	}

	const showDeleteConfirm = (value: boolean) => {
		setDeleteConfirmVisibility(value);
	}

	const syncDeleteAmount = (value: string) => {
		setDeleteAmount(value);
	}

	useLayoutEffect(() => {
		if (notes.length > 0) {
			setNotesUnavailable(false);
		} else {
			setNotesUnavailable(true);
		}
	}, [notes]);


	// Visibility of note-dialog overlay
	useEffect(() => {
		if (isNoteDialogVisible) {
			setOverlayClasses("overlay-visible");
		} else {
			setOverlayClasses("");
		}
	}, [isNoteDialogVisible]);


	// Glowing effect behind note-dialog for gradient backgrounds
	useEffect(() => {
		if (isNoteDialogVisible && noteTheme.isGradient) {
			setBlurOverlayClasses(`blur-visible ${noteTheme.colour}`);				
		} else {
			setBlurOverlayClasses("");
		}
	}, [isNoteDialogVisible, noteTheme]);

	return (
		<Fragment>
			<Header
				pageLabel={pageLabel}
				activePage={activePage}
				notesUnavailable={notesUnavailable}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>

			<div onClick={closeNoteDialog} className={`overlay ${overlayClasses}`}></div>
			<div className={`background-blur ${blurOverlayClasses}`}></div>

			<NoteDialog
				activePage={activePage}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>

			{!notesUnavailable &&
				<div className="notes">
					{notes.map((note) => (
						<Note
							key={note.id}
							id={note.id}
							title={note.title}
							text={note.text}
							images={note.images}
							theme={note.theme}
							font={note.font}
							isFavourite={note.isFavourite}
						/>
					))}
				</div>
			}

			{notesUnavailable &&
				<div className="notes-unavailable">
					<span className={notesUnavailableClass}>
						{notesUnavailableIcon}
						
						{activePage === "home" &&
							<h2 onClick={showNoteDialog}
								className="clickable">
								{notesUnavailableInfo}
							</h2>
						}

						{activePage !== "home" &&
							<h2>
								{notesUnavailableInfo}
							</h2>
						}
					</span>
				</div>
			}

			{activePage === "trash" &&
				<ConfirmDelete
					deleteConfirmVisible={deleteConfirmVisible}
					deleteAmount={deleteAmount}
					onShowDeleteConfirm={showDeleteConfirm}
				/>
			}
		</Fragment>
	)
}

export default BaseComponent;
