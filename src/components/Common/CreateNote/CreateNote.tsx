import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../../store/store";
import ArrowLeftIcon from "../../Icons/ArrowLeftIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import FavouriteIcon from "../../Icons/FavouriteIcon";
import UnfavouriteIcon from "../../Icons/UnfavouriteIcon";
import ButtonPanel from "./ButtonPanel/ButtonPanel";

type CreateNoteProps = {
	activePage: string,
};

function CreateNote(props: CreateNoteProps) {
	const {activePage} = props;
	const dispatch = useDispatch();
	const uploadImageButton = useRef<HTMLInputElement>(null);

	const formVisibility = useSelector((state: RootState) => state.isFormVisible);
	const background = useSelector((state: RootState) => state.noteTheme);
	const fontFamily = useSelector((state: RootState) => state.noteFont);
	const noteTitle = useSelector((state: RootState) => state.noteTitle);
	const noteContent = useSelector((state: RootState) => state.noteContent);
	const images = useSelector((state: RootState) => state.noteImages);
	const favourite = useSelector((state: RootState) => state.noteIsFavourite);

	const [formClasses, setFormClasses] = useState<string>("");
	const [imageClasses, setImageClasses] = useState<string>("");
	const [imageColumns, setImageColumns] = useState({ columns: "1" });
	const [themeOptions, setThemeOptions] = useState({ fontSelect: false, palette: false });

	const themeOptionsHandler = (value: {fontSelect: boolean, palette: boolean}) => {
		setThemeOptions({
			fontSelect: value.fontSelect,
			palette: value.palette
		});
	}

	const hideElements = () => {
		setThemeOptions({
			fontSelect: false,
			palette: false
		});
	}

	useEffect(() => {
		if (!formVisibility) {
			hideElements();
		}
	}, [formVisibility]);

	useEffect(() => {
		const formClassNames: string = `${ background } ${ fontFamily }`;
		if (formVisibility) {
			setFormClasses(`form-visible ${formClassNames}`);
		} else {
			setFormClasses("");
		}
	}, [formVisibility, background, fontFamily]);

	useEffect(() => {
		if (images.length === 1) {
			setImageClasses("rem-50");
			setImageColumns({columns: "1"});
		} else {
			setImageClasses("rem-24");
			setImageColumns({columns: "2"});
		}
	}, [images.length]);

	const closeNoteDialog = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(noteActions.formVisibility(false));
	}

	const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(noteActions.currentTitle(e.target.value));
	}

	const setNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(noteActions.currentNote(e.target.value));
	}

	const uploadButtonClicked = () => {
		uploadImageButton.current?.click();
	}

	const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const uploadedImage = URL.createObjectURL(e.target.files[0]);
			dispatch(noteActions.imageUploaded(uploadedImage));
		}
	}

	const toggleFavourite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(noteActions.toggleFavouriteStatus());
	}

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
							{!favourite && <FavouriteIcon />}
							{favourite && <UnfavouriteIcon />}
					</button>
				</div>

				{images.length > 0 &&
					<div className="images" style={imageColumns}>
						{images.map((image, index) => (
							<div className="image" key={index}>
								<img className={imageClasses} src={image} alt="" />
								<button className="delete-image" disabled={activePage === "trash"}>
									<DeleteIcon />
								</button>
							</div>
						))}
					</div>
				}

				<div className="user-inputs">
					<input onChange={setTitle}
						value={noteTitle}
						placeholder="Title"
						type="text"
						spellCheck={false}
						disabled={activePage === "trash"}
					/>

					<textarea onChange={setNote}
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
				/>
			</div>
		</form>
	);
}

export default CreateNote;
