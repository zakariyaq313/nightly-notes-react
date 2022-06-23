import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState, useThunkDispatch } from "../../../store/store";
import { moveToTrash, restoreFromTrash } from "../../../store/action-creators/action-creators";
import { NoteOptionsProps } from "../../../types/types";
import FontSelect from "../../UIComponents/FontSelect";
import Palette from "../../UIComponents/Palette";
import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import ImageIcon from "../../../icons/ImageIcon";
import PaletteIcon from "../../../icons/PaletteIcon";
import RestoreIcon from "../../../icons/RestoreIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import "../../../styles/note-options/note-options.scss";

function NoteOptions(props: NoteOptionsProps): JSX.Element {
	const {
		activePage,
		fontAndPaletteVisibility,
		onUpdateFontAndPalette,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const dispatch = useDispatch();
	const thunkDispatch = useThunkDispatch();

	const imageUploader = useRef<HTMLInputElement>(null);
	const [rotateIcon, setRotateIcon] = useState("rotate(0)");
	const noteIsEmpty = useSelector((state: RootState) => state.isNoteEmpty);

	const toggleFontSelect = () => {
		onUpdateFontAndPalette({
			fontSelect: !fontAndPaletteVisibility.fontSelect,
			palette: false
		});
	}

	const togglePalette = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onUpdateFontAndPalette({
			fontSelect: false,
			palette: !fontAndPaletteVisibility.palette
		});
	}

	const closeElements = () => {
		onUpdateFontAndPalette({
			fontSelect: false,
			palette: false
		});
	}

	const uploadImageClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		closeElements();
		imageUploader.current?.click();
	}

	const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const uploadedImage = URL.createObjectURL(e.target.files[0]);
			dispatch(noteActions.addNoteImages(uploadedImage));
		}
	}

	const trashNote = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(moveToTrash());
	}

	const restoreNote = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(restoreFromTrash());
	}

	const confirmDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onShowDeleteConfirm(true);
		onSyncDeleteAmount("one");
	}

	useEffect(() => {
		if (fontAndPaletteVisibility.fontSelect) {
			setRotateIcon("rotate(180deg)");
		} else {
			setRotateIcon("rotate(0)");
		}
	}, [fontAndPaletteVisibility.fontSelect]);

	return (
		<div className="note-options">
			{activePage !== "trash" &&
				<Fragment>
					<span onClick={toggleFontSelect} className="font-select-button">
						Font family
						<ArrowDownIcon style={rotateIcon} />
					</span>

					{/* Hidden image upload input */}
					<input onChange={uploadImage}
						ref={imageUploader}
						type="file" accept="image/*"
						style={{display: "none"}}
					/>

					<button onClick={uploadImageClicked} title="Image">
						<ImageIcon />
					</button>

					<button onClick={togglePalette} title="Background colour">
						<PaletteIcon />
					</button>

					<button onClick={trashNote} disabled={noteIsEmpty} title="Delete">
						<DeleteIcon />
					</button>
				</Fragment>
			}

			{activePage === "trash" &&
				<Fragment>
					<button onClick={confirmDeletion} title="Delete forever">
						<DeleteIcon />
					</button>

					<button onClick={restoreNote} title="Restore">
						<RestoreIcon />
					</button>
				</Fragment>
			}

			{fontAndPaletteVisibility.fontSelect &&
				<FontSelect />
			}

			{fontAndPaletteVisibility.palette &&
				<Palette />
			}
		</div>
	);
}

export default NoteOptions;
