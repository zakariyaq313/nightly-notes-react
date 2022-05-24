import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import CreateNote from "../Common/CreateNote/CreateNote";
import Note from "../Common/Note/Note";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../store/store";

type Props = {
	activePage: string,
	pageLabel: React.ReactElement,
	emptyNotesClass: string,
	emptyNotesInfo: string,
	emptyNotesIcon: React.ReactElement,
	notes: {
		noteId: string,
		noteTitle: string,
		noteContent: string,
		noteImages: string[],
		noteTheme: string,
		noteFont: string,
		noteIsFavourite: boolean
	}[]
};

function Page(props: Props) {
	const {notes, activePage, pageLabel, emptyNotesClass, emptyNotesInfo, emptyNotesIcon} = props;

	const [notesEmpty, setNotesEmpty] = useState<boolean>(true);
	const [overlayVisible, setOverlayVisibility] = useState<string>("");

	const formIsVisible = useSelector((state: RootState) => state.isFormVisible);
	const dispatch = useDispatch();

	const closeNote = () => {
		dispatch(noteActions.resetNote());
		dispatch(noteActions.formVisibility(false));
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
			setOverlayVisibility("overlay-visible");
		} else {
			setOverlayVisibility("");
		}
	}, [formIsVisible]);

	return (
		<Fragment>
			<Navbar
				pageLabel={pageLabel}
				activePage={activePage}
				notesEmpty={notesEmpty}
			/>

			<div onClick={closeNote} className={`overlay ${overlayVisible}`}></div>
			<div className="['background-blur', blurOverlayClasses]"></div>

			<CreateNote
				activePage={activePage}
			/>

			<div className="notes">
				{ notes.map((note) => {
					return <Note
						key={note.noteId}
						id={note.noteId}
						title={note.noteTitle}
						content={note.noteContent}
						images={note.noteImages}
						theme={note.noteTheme}
						font={note.noteFont}
						favourite={note.noteIsFavourite}
					/>
				})}
			</div>

			{notesEmpty &&
				<div className="notes-unavailable">
					<h2 className={emptyNotesClass}>
						{emptyNotesIcon}
						<span>{emptyNotesInfo}</span>
					</h2>
				</div>
			}
		</Fragment>
	)
}

export default Page;
