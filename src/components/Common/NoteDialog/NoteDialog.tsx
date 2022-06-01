import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../../store/store";
import { NoteDialogProps } from "../../../types/types";
import ArrowLeftIcon from "../../Icons/ArrowLeftIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import FavouriteIcon from "../../Icons/FavouriteIcon";
import UnfavouriteIcon from "../../Icons/UnfavouriteIcon";
import ButtonPanel from "./ButtonPanel/ButtonPanel";

function NoteDialog(props: NoteDialogProps) {
	const {
		activePage,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const {
		isFormVisible,
		noteTitle,
		noteContent,
		noteImages,
		noteTheme,
		noteFont,
		noteIsFavourite
	} = useSelector((state: RootState) => state);

	const dispatch = useDispatch();
	const uploadImageButton = useRef<HTMLInputElement>(null);

	const [formClasses, setFormClasses] = useState("");
	const [imageClasses, setImageClasses] = useState("");
	const [imageColumns, setImageColumns] = useState({ columns: "1" });
	const [themeOptions, setThemeOptions] = useState({ fontSelect: false, palette: false });

	const themeOptionsHandler = (value: {fontSelect: boolean, palette: boolean}) => {
		setThemeOptions({fontSelect: value.fontSelect, palette: value.palette});
	}

	const hideElements = () => {
		setThemeOptions({fontSelect: false, palette: false});
	}

	const closeNoteDialog = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(noteActions.noteDialogIsVisible(false));
	}

	const syncNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(noteActions.setNoteTitle(e.target.value));
	}

	const syncNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(noteActions.setNoteContent(e.target.value));
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

	// Set form(note dialog) classes
	useEffect(() => {
		const formClassNames: string = `${ noteTheme } ${ noteFont }`;
		if (isFormVisible) {
			setFormClasses(`form-visible ${formClassNames}`);
		} else {
			setFormClasses("");
			hideElements();
		}
	}, [isFormVisible, noteTheme, noteFont]);

	// Set image classes and style
	useEffect(() => {
		if (noteImages.length === 1) {
			setImageClasses("rem-50");
			setImageColumns({columns: "1"});
		} else {
			setImageClasses("rem-24");
			setImageColumns({columns: "2"});
		}
	}, [noteImages.length]);

	// Set noteIsEmpty global state
	useEffect(() => {
		if (noteTitle.trim() !== "" || noteContent.trim() !== "" || noteImages.length > 0) {
			dispatch(noteActions.noteIsEmpty(false));
		} else {
			dispatch(noteActions.noteIsEmpty(true));
		}
	}, [dispatch, noteTitle, noteContent, noteImages]);

	return (
		<form className={formClasses}>
			<div onClick={hideElements} className="upper-half">
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
						value={noteTitle}
						placeholder="Title"
						type="text"
						spellCheck={false}
						disabled={activePage === "trash"}
					/>

					<textarea onChange={syncNoteContent}
						value={noteContent}
						placeholder="Your note"
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
				
			<div className="lower-half">
				<ButtonPanel
					activePage={activePage}
					themeOptions={themeOptions}
					onUpdateThemeOptions={themeOptionsHandler}
					onUploadImage={uploadButtonClicked}
					onShowDeleteConfirm={showDeleteConfirm}
					onSyncDeleteAmount={syncDeleteAmount}
				/>
			</div>
		</form>
	);
}

export default NoteDialog;
