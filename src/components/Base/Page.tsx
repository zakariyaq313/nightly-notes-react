import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { exitNote } from "../../store/thunks/thunks";
import { PageProps } from "../../types/types";
import Navbar from "../Common/Header";
import Note from "../Common/Note/Note";
import NoteDialog from "../Common/NoteDialog/NoteDialog";
import ConfirmDelete from "../Common/ConfirmDelete";

function Page(props: PageProps): JSX.Element {
	const {
		notes,
		activePage,
		pageLabel,
		emptyNotesClass,
		emptyNotesInfo,
		emptyNotesIcon
	} = props;

	const {
		isNoteDialogVisible,
		noteTheme,
		noteThemeIsGradient
	} = useSelector((state: RootState) => state);

	const thunkDispatch = useAppDispatch();
	
	const [notesUnavailable, setNotesUnavailable] = useState(true);
	const [overlayClasses, setOverlayClasses] = useState("");
	const [blurOverlayClasses, setBlurOverlayClasses] = useState("");
	const [deleteConfirmVisible, setDeleteConfirmVisibility] = useState(false);
	const [deleteAmount, setDeleteAmount] = useState("");

	const closeNote = () => {
		thunkDispatch(exitNote(activePage));
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

	useEffect(() => {
		if (isNoteDialogVisible) {
			setOverlayClasses("overlay-visible");
		} else {
			setOverlayClasses("");
		}
	}, [isNoteDialogVisible]);

	useEffect(() => {
		if (isNoteDialogVisible && noteThemeIsGradient) {
			setBlurOverlayClasses(`blur-visible ${noteTheme}`);				
		} else {
			setBlurOverlayClasses("");
		}
	}, [isNoteDialogVisible, noteTheme, noteThemeIsGradient]);

	return (
		<Fragment>
			<Navbar
				pageLabel={pageLabel}
				activePage={activePage}
				notesUnavailable={notesUnavailable}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>

			<div onClick={closeNote} className={`overlay ${overlayClasses}`}></div>
			<div className={`background-blur ${blurOverlayClasses}`}></div>

			<NoteDialog
				activePage={activePage}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>

			<div className="notes">
				{notes.map((note) => (
					<Note
						key={note.id}
						id={note.id}
						title={note.title}
						content={note.content}
						images={note.images}
						theme={note.theme}
						font={note.font}
						isFavourite={note.isFavourite}
						isGradient={note.isGradient}
					/>
				))}
			</div>

			{notesUnavailable &&
				<div className="notes-unavailable">
					<h2 className={emptyNotesClass}>
						{emptyNotesIcon}
						<span>{emptyNotesInfo}</span>
					</h2>
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

export default Page;
