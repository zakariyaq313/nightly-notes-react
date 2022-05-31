import { Fragment, useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import NoteDialog from "../Common/NoteDialog/NoteDialog";
import Note from "../Common/Note/Note";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { exitNote } from "../../store/thunks/thunks";
import { PageProps } from "../../types/types";
import ConfirmDelete from "../Common/ConfirmDelete";

function Page(props: PageProps) {
	const {
		notes, activePage, pageLabel, emptyNotesClass, emptyNotesInfo, emptyNotesIcon
	} = props;
	const formIsVisible = useSelector((state: RootState) => state.isFormVisible);
	const thunkDispatch = useAppDispatch();
	const [notesEmpty, setNotesEmpty] = useState<boolean>(true);
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

	useEffect(() => {
		if (notes.length > 0) {
			setNotesEmpty(false);
		} else {
			setNotesEmpty(true);
		}
	}, [notes]);

	useEffect(() => {
		if (formIsVisible) {
			setOverlayClasses("overlay-visible");
		} else {
			setOverlayClasses("");
		}
	}, [formIsVisible]);

	return (
		<Fragment>
			<Navbar
				pageLabel={pageLabel}
				activePage={activePage}
				notesEmpty={notesEmpty}
				onShowDeleteConfirm={showDeleteConfirm}
				onSetDeleteAmount={syncDeleteAmount}
			/>

			<div onClick={closeNote} className={`overlay ${overlayClasses}`}></div>
			<div className={`background-blur' ${blurOverlayClasses}`}></div>

			<NoteDialog
				activePage={activePage}
				onShowDeleteConfirm={showDeleteConfirm}
				onSetDeleteAmount={syncDeleteAmount}
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
					/>
				))}
			</div>

			{notesEmpty &&
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
