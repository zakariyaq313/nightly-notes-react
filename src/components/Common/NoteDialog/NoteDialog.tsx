import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../../store/store";
import { NoteDialogProps } from "../../../types/types";
import ArrowLeftIcon from "../../Icons/ArrowLeftIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import FavouriteIcon from "../../Icons/HeartOutlineIcon";
import UnfavouriteIcon from "../../Icons/HeartFilledIcon";
import ButtonPanel from "./ButtonPanel/ButtonPanel";

function NoteDialog(props: NoteDialogProps): JSX.Element {
	const {
		activePage,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const {
		isNoteDialogVisible,
		noteTitle,
		noteContent,
		noteImages,
		noteTheme,
		noteFont,
		noteIsFavourite
	} = useSelector((state: RootState) => state);

	const dispatch = useDispatch();
	const noteTextArea = useRef<HTMLTextAreaElement>(null);
	const uploadImageButton = useRef<HTMLInputElement>(null);

	const [noteDialogClasses, setNoteDialogClasses] = useState("");
	const [imageClasses, setImageClasses] = useState("");
	const [imageColumns, setImageColumns] = useState({ columns: "1" });
	const [fontAndPaletteVisibility, setFontAndPalette] = useState({fontSelect: false, palette: false});

	const fontAndPaletteHandler = (value: {fontSelect: boolean, palette: boolean}) => {
		setFontAndPalette({fontSelect: value.fontSelect, palette: value.palette});
	}

	const hideFontAndPalette = () => {
		setFontAndPalette({fontSelect: false, palette: false});
	}

	const closeNoteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(noteActions.noteDialogIsVisible(false));
	}

	const syncNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(noteActions.setNoteTitle(e.target.value));
	}

	const syncNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(noteActions.setNoteContent(e.target.value));
	}

	const enterTextArea = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter" || e.key === "NumpadEnter") {
			e.preventDefault();
			noteTextArea.current?.focus();
		}
	}

	const uploadButtonClicked = () => {
		uploadImageButton.current?.click();
	}

	const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const uploadedImage = URL.createObjectURL(e.target.files[0]);
			dispatch(noteActions.setNoteImages(uploadedImage));
		}
	}

	const deleteImage = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault();
		dispatch(noteActions.deleteImages(index));
	}

	const toggleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(noteActions.setNoteFavourite());
	}

	const showDeleteConfirm = (value: boolean) => {
		onShowDeleteConfirm(value);
	}

	const syncDeleteAmount = (value: string) => {
		onSyncDeleteAmount(value);
	}

	// Set theme (font and background) for note dialog
	useEffect(() => {
		const themeClasses: string = `${noteTheme} ${noteFont}`;
		if (isNoteDialogVisible) {
			setNoteDialogClasses(`note-dialog-visible ${themeClasses}`);
		} else {
			setNoteDialogClasses("");
			hideFontAndPalette();
		}
	}, [isNoteDialogVisible, noteTheme, noteFont]);

	// Set styles for image/s in note dialog
	useEffect(() => {
		if (noteImages.length === 1) {
			setImageClasses("rem-50");
			setImageColumns({columns: "1"});
		} else {
			setImageClasses("rem-24");
			setImageColumns({columns: "2"});
		}
	}, [noteImages.length]);

	// Set isNoteEmpty global state
	useEffect(() => {
		if (noteTitle.trim() !== "" || noteContent.trim() !== "" || noteImages.length > 0) {
			dispatch(noteActions.noteIsEmpty(false));
		} else {
			dispatch(noteActions.noteIsEmpty(true));
		}
	}, [dispatch, noteTitle, noteContent, noteImages]);

	return (
		<form className={`note-dialog ${noteDialogClasses}`}>
			<div onClick={hideFontAndPalette} className="note-content">
				<div className="action-buttons">
					<button onClick={closeNoteDialog}>
						<ArrowLeftIcon />
					</button>

					<button onClick={toggleFavourite}
						className="favourite-button"
						disabled={activePage === "trash"}>
							{!noteIsFavourite && <FavouriteIcon />}
							{noteIsFavourite && <UnfavouriteIcon />}
					</button>
				</div>

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
						onKeyDown={(e) => enterTextArea(e)}
						value={noteTitle}
						placeholder="Title"
						type="text"
						spellCheck={false}
						disabled={activePage === "trash"}
					/>

					<textarea onChange={syncNoteContent}
						value={noteContent}
						placeholder="Your note"
						ref={noteTextArea}
						spellCheck={false}
						disabled={activePage === "trash"}>
					</textarea>

					<input onChange={uploadImage}
						ref={uploadImageButton}
						type="file" accept="image/*"
						style={{display: "none"}}
					/>
				</div>
			</div>

			<ButtonPanel
				activePage={activePage}
				fontAndPaletteVisibility={fontAndPaletteVisibility}
				onUpdateFontAndPalette={fontAndPaletteHandler}
				onUploadImage={uploadButtonClicked}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>
		</form>
	);
}

export default NoteDialog;
