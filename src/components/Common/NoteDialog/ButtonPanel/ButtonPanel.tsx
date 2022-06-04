import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store/store";
import { moveToTrash, restoreFromTrash } from "../../../../store/thunks/thunks";
import { ButtonPanelProps } from "../../../../types/types";
import ArrowDownIcon from "../../../Icons/ArrowDownIcon";
import ImageIcon from "../../../Icons/ImageIcon";
import PaletteIcon from "../../../Icons/PaletteIcon";
import RestoreIcon from "../../../Icons/RestoreIcon";
import FontSelect from "./FontSelect/FontSelect";
import Palette from "./ColorPalette/Palette";
import DeleteIcon from "../../../Icons/DeleteIcon";

function ButtonPanel (props: ButtonPanelProps): JSX.Element {
	const {
		activePage,
		fontAndPaletteVisibility,
		onUpdateFontAndPalette,
		onUploadImage,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const thunkDispatch = useAppDispatch();
	const noteIsEmpty = useSelector((state: RootState) => state.isNoteEmpty);
	const [rotateIcon, setRotateIcon] = useState("rotate(0)");

	const toggleFontSelect = () => {
		onUpdateFontAndPalette({fontSelect: !fontAndPaletteVisibility.fontSelect, palette: false});
	}

	const togglePalette = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onUpdateFontAndPalette({fontSelect: false, palette: !fontAndPaletteVisibility.palette});
	}

	const closeElements = () => {
		onUpdateFontAndPalette({fontSelect: false, palette: false});
	}

	const uploadImage = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		closeElements();
		onUploadImage();
	}

	const trashNote = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(moveToTrash());
	}

	const confirmDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onShowDeleteConfirm(true);
		onSyncDeleteAmount("one");
	}

	const restoreNote = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(restoreFromTrash());
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

					<button onClick={uploadImage} title="Image">
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

			{fontAndPaletteVisibility.fontSelect && <FontSelect />}
			{fontAndPaletteVisibility.palette && <Palette />}
		</div>
	);
}

export default ButtonPanel;
