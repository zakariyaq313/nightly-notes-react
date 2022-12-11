import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState, useThunkDispatch } from "../../../store/store";
import { moveToTrash, restoreFromTrash } from "../../../store/action-creators/action-creators";
import FontSelect from "../FontSelect/FontSelect";
import ThemePalette from "../ThemePalette/ThemePalette";
import ChevronDown from "../../../icons/ChevronDown";
import ImageUpload from "../../../icons/ImageUpload";
import Palette from "../../../icons/Palette";
import Restore from "../../../icons/Restore";
import Delete from "../../../icons/Delete";
import { VisibleElements } from "../../../types/types";
import "./NoteOptions.scss";

type Props = {
	activePage: string,
	visibleElements: VisibleElements
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void,
	onUpdateElementsVisibility: (value: VisibleElements) => void
};

function NoteOptions(props: Props): JSX.Element {
	const {
		activePage,
		visibleElements,
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
			fontSelect: !visibleElements.fontSelect,
			themePalette: false
		});
	}

	const togglePalette = (e: React.MouseEvent) => {
		e.preventDefault();
		onUpdateElementsVisibility({
			fontSelect: false,
			themePalette: !visibleElements.themePalette
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
		if (visibleElements.fontSelect) {
			setRotateIcon("rotate(180deg)");
		} else {
			setRotateIcon("rotate(0)");
		}
	}, [visibleElements.fontSelect]);

	return (
		<div className="note-options">
			{activePage !== "trash" && (
				<Fragment>
					<span onClick={toggleFontSelect} className="font-select-button">
						Font family
						<ChevronDown style={rotateIcon} />
					</span>

					{/* Hidden image upload input */}
					<input onChange={uploadImage}
						ref={imageUploader}
						type="file" accept="image/*"
						style={{display: "none"}}
					/>

					<button onClick={uploadImageClicked} title="Image"><ImageUpload/></button>
					<button onClick={togglePalette} title="Background colour"><Palette/></button>
					<button onClick={trashNote} title="Delete" disabled={noteIsEmpty}><Delete/></button>
				</Fragment>
			)}

			{activePage === "trash" && (
				<Fragment>
					<button onClick={confirmDeletion} title="Delete forever"><Delete/></button>
					<button onClick={restoreNote} title="Restore"><Restore/></button>
				</Fragment>
			)}

			{visibleElements.fontSelect && <FontSelect/>}
			{visibleElements.themePalette && <ThemePalette/>}
		</div>
	);
}

export default NoteOptions;
