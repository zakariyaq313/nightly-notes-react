import DeleteIcon from "../../../icons/DeleteIcon";
import { useEffect, useRef, useState } from "react";
import { noteActions, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { NoteContentProps } from "../../../types/types";
import "../../../styles/note-content/note-content.scss";

function NoteContent(props: NoteContentProps): JSX.Element {
    const {activePage, onHideFontAndPalette} = props;
	const {noteTitle, noteText, noteImages} = useSelector((state: RootState) => state);

    const [imageClasses, setImageClasses] = useState("");
	const [imageColumns, setImageColumns] = useState({columns: ""});

    const dispatch = useDispatch();
    const noteTextArea = useRef<HTMLTextAreaElement>(null);

    const syncNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(noteActions.setNoteTitle(e.target.value));
	}

	const syncNoteText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(noteActions.setNoteText(e.target.value));
	}

	const enterTextArea = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter" || e.key === "NumpadEnter") {
			e.preventDefault();
			noteTextArea.current?.focus();
		}
	}

    const deleteImage = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		dispatch(noteActions.deleteNoteImages(index));
	}

    const hideFontAndPalette = () => {
		onHideFontAndPalette();
    }

    // Set styles for image/s in note dialog
	useEffect(() => {
		if (noteImages.length > 1) {
			setImageClasses("rem-24");
			setImageColumns({columns: "2"});
		} else {
			setImageClasses("rem-50");
			setImageColumns({columns: "1"});
		}
	}, [noteImages.length]);

    // Set isNoteEmpty global state
	useEffect(() => {
		if (noteTitle.trim() !== "" || noteText.trim() !== "" || noteImages.length > 0) {
			dispatch(noteActions.noteIsEmpty(false));
		} else {
			dispatch(noteActions.noteIsEmpty(true));
		}
	}, [dispatch, noteTitle, noteText, noteImages]);

    return (
        <div onClick={hideFontAndPalette} className="note-content">
			{noteImages.length > 0 &&
				<div className="images" style={imageColumns}>
					{noteImages.map((image, index) => (
						<div className="image" key={index}>
							<img className={imageClasses} src={image} alt="" />
							<button
								onClick={(e) => deleteImage(e, index)}
								className="delete-image"
					    		disabled={activePage === "trash"}>
									<DeleteIcon />
							</button>
						</div>
					))}
				</div>
			}

			<div className="user-inputs">
				<input onChange={syncNoteTitle}
					onKeyDown={enterTextArea}
					value={noteTitle}
					placeholder="Title"
					type="text"
					spellCheck={false}
					disabled={activePage === "trash"}
				/>

				<textarea onChange={syncNoteText}
					value={noteText}
					placeholder="Your note"
					ref={noteTextArea}
					spellCheck={false}
					disabled={activePage === "trash"}>
				</textarea>
			</div>
		</div>
    );
}

export default NoteContent;
