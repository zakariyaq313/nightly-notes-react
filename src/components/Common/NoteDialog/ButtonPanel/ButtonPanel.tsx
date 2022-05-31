import React, { Fragment } from "react";
import ArrowDownIcon from "../../../Icons/ArrowDownIcon";
import ImageIcon from "../../../Icons/ImageIcon";
import PaletteIcon from "../../../Icons/PaletteIcon";
import RestoreIcon from "../../../Icons/RestoreIcon";
import TrashIcon from "../../../Icons/TrashIcon";
import FontSelect from "./FontSelect/FontSelect";
import Palette from "./ColorPalette/Palette";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store/store";
import { moveToTrash, restoreFromTrash } from "../../../../store/thunks/thunks";
import { ButtonPanelProps } from "../../../../types/types";

function ButtonPanel (props: ButtonPanelProps) {
	const {
		activePage,
		themeOptions,
		onUpdateThemeOptions,
		onUploadImage,
		onShowDeleteConfirm,
		onSetDeleteAmount
	} = props;

	const noteIsEmpty = useSelector((state: RootState) => state.isNoteEmpty);
	const thunkDispatch = useAppDispatch();

	const openFontSelect = () => {
		onUpdateThemeOptions({
			fontSelect: !themeOptions.fontSelect,
			palette: false
		});
	}

	const openPalette = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onUpdateThemeOptions({
			fontSelect: false,
			palette: !themeOptions.palette
		});
	}

	const closeElements = () => {
		onUpdateThemeOptions({
			fontSelect: false,
			palette: false
		});
	}

	const uploadImage = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		closeElements();
		onUploadImage();
	}

	const trashNote = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(moveToTrash());
	}

	const confirmDeletion = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onShowDeleteConfirm(true);
		onSetDeleteAmount("one");
	}

	const restoreNote = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(restoreFromTrash());
	}

	return (
		<div className="note-options">
			{activePage !== "trash" &&
				<Fragment>
					<span onClick={openFontSelect} className="font-select-button">
						Font family
						<ArrowDownIcon />
					</span>

					<button onClick={uploadImage} title="Image">
						<ImageIcon />
					</button>

					<button onClick={openPalette} title="Background colour">
						<PaletteIcon />
					</button>

					<button onClick={trashNote} disabled={noteIsEmpty} title="Delete">
						<TrashIcon />
					</button>
				</Fragment>
			}

			{activePage === "trash" &&
				<Fragment>
					<button onClick={confirmDeletion} title="Delete forever">
						<TrashIcon />
					</button>

					<button onClick={restoreNote} title="Restore">
						<RestoreIcon />
					</button>
				</Fragment>
			}

			{themeOptions.fontSelect && <FontSelect />}
			{themeOptions.palette && <Palette />}
		</div>
	);
}

export default ButtonPanel;
