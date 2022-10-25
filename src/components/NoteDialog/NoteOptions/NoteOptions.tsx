import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState, useThunkDispatch } from "../../../store/store";
import { moveToTrash, restoreFromTrash } from "../../../store/action-creators/action-creators";
import FontSelect from "../../UIComponents/FontSelect";
import ThemePalette from "../../UIComponents/ThemePalette";
import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import ImageIcon from "../../../icons/ImageUploadIcon";
import PaletteIcon from "../../../icons/PaletteIcon";
import RestoreIcon from "../../../icons/RestoreIcon";
import DeleteIcon from "../../../icons/DeleteIcon";
import "../../../sass/note-options/note-options.scss";
import { ElementsVisible } from "../../../types/types";

type Props = {
	activePage: string,
	elementsVisible: ElementsVisible
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void,
	onUpdateElementsVisibility: (value: ElementsVisible) => void
};

function NoteOptions(props: Props): JSX.Element {
	const {
		activePage,
		elementsVisible,
		onShowDeleteConfirm,
		onSyncDeleteAmount,
		onUpdateElementsVisibility
	} = props;

	const dispatch = useDispatch();
	const thunkDispatch = useThunkDispatch();
	const imageUploader = useRef<HTMLInputElement>(null);
	const [rotateIcon, setRotateIcon] = useState("rotate(0)");
	const noteIsEmpty = useSelector((state: RootState) => state.isNoteEmpty);

	const toggleFontSelect = () => {
		onUpdateElementsVisibility({
			fontSelect: !elementsVisible.fontSelect,
			themePalette: false
		});
	}

	const togglePalette = (e: React.MouseEvent) => {
		e.preventDefault();
		onUpdateElementsVisibility({
			fontSelect: false,
			themePalette: !elementsVisible.themePalette
		});
	}

	const closeElements = () => {
		onUpdateElementsVisibility({
			fontSelect: false,
			themePalette: false
		});
	}

	const uploadImageClicked = (e: React.MouseEvent) => {
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

	const trashNote = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(moveToTrash());
	}

	const restoreNote = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(restoreFromTrash());
	}

	const confirmDeletion = (e: React.MouseEvent) => {
		e.preventDefault();
		onShowDeleteConfirm(true);
		onSyncDeleteAmount("one");
	}

	useEffect(() => {
		if (elementsVisible.fontSelect) {
			setRotateIcon("rotate(180deg)");
		} else {
			setRotateIcon("rotate(0)");
		}
	}, [elementsVisible.fontSelect]);

	return (
		<div className="note-options">
			{activePage !== "trash" && (
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

					<button onClick={uploadImageClicked} title="Image"><ImageIcon/></button>
					<button onClick={togglePalette} title="Background colour"><PaletteIcon/></button>
					<button onClick={trashNote} title="Delete" disabled={noteIsEmpty}><DeleteIcon/></button>
				</Fragment>
			)}

			{activePage === "trash" && (
				<Fragment>
					<button onClick={confirmDeletion} title="Delete forever"><DeleteIcon/></button>
					<button onClick={restoreNote} title="Restore"><RestoreIcon/></button>
				</Fragment>
			)}

			{elementsVisible.fontSelect && <FontSelect/>}
			{elementsVisible.themePalette && <ThemePalette/>}
		</div>
	);
}

export default NoteOptions;
