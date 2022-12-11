import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { noteActions, RootState, useThunkDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { exitNoteDialog } from "../../store/action-creators/action-creators";
import { NoteType } from "../../types/types";
import SavedNote from "../SavedNote/SavedNote";
import NoteDialog from "../NoteDialog/NoteDialog";
import PageHeader from "../UIComponents/PageHeader/PageHeader";
import ConfirmDelete from "../UIComponents/ConfirmDelete/ConfirmDelete";
import "./BaseComponent.scss";

type Props = {
	activePage: string,
	pageTitle: {main: string, optional?: string},
	notesUnavailableClass?: string,
	notesUnavailableInfo: string,
	notesUnavailableIcon: JSX.Element,
	notes: NoteType[]
};

function BaseComponent(props: Props): JSX.Element {
	const {
		notes,
		activePage,
		pageTitle,
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
		thunkDispatch(exitNoteDialog(activePage));
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
	}, [notes.length]);


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
			<PageHeader pageTitle={pageTitle}
				activePage={activePage}
				notesUnavailable={notesUnavailable}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>

			<div className={`overlay ${overlayClasses}`} onClick={closeNoteDialog}></div>
			<div className={`background-blur ${blurOverlayClasses}`}></div>

			<NoteDialog activePage={activePage}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>

			{!notesUnavailable && (
				<div className="notes">
					{notes.map((note) => (
						<SavedNote key={note.id}
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
			)}

			{notesUnavailable && (
				<div className="notes-unavailable">
					<span className={notesUnavailableClass}>
						{notesUnavailableIcon}
						
						{activePage === "home" && (
							<h2 className="clickable" onClick={showNoteDialog}>
								{notesUnavailableInfo}
							</h2>
						)}

						{activePage !== "home" && (
							<h2>{notesUnavailableInfo}</h2>
						)}
					</span>
				</div>
			)}

			{activePage === "trash" && (
				<ConfirmDelete deleteConfirmVisible={deleteConfirmVisible}
					deleteAmount={deleteAmount}
					onShowDeleteConfirm={showDeleteConfirm}
				/>
			)}
		</Fragment>
	)
}

export default BaseComponent;
