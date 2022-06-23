import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState, useThunkDispatch } from "../../store/store";
import { NoteDialogProps } from "../../types/types";
import { exitNote } from "../../store/action-creators/action-creators";
import NoteContent from "./NoteContent/NoteContent";
import NoteOptions from "./NoteOptions/NoteOptions";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import FavouriteIcon from "../../icons/HeartOutlineIcon";
import UnfavouriteIcon from "../../icons/HeartFilledIcon";
import "../../styles/note-dialog/note-dialog.scss";

function NoteDialog(props: NoteDialogProps): JSX.Element {
	const {
		activePage,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const {
		isNoteDialogVisible,
		noteTheme,
		noteFont,
		noteIsFavourite
	} = useSelector((state: RootState) => state);

	const dispatch = useDispatch();
	const thunkDispatch = useThunkDispatch();

	const [noteDialogClasses, setNoteDialogClasses] = useState("");
	const [fontAndPaletteVisibility, setFontAndPalette] = useState({
		fontSelect: false,
		palette: false
	});

	const fontAndPaletteHandler = (value: {fontSelect: boolean, palette: boolean}) => {
		setFontAndPalette({
			fontSelect: value.fontSelect,
			palette: value.palette
		});
	}

	const hideFontAndPalette = () => {
		setFontAndPalette({
			fontSelect: false,
			palette: false
		});
	}

	const closeNoteDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		thunkDispatch(exitNote(activePage));
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

	// Actions when note dialog becomes visible/invisible
	useEffect(() => {
		const themeClasses: string = `${noteTheme.colour} ${noteFont}`;
		if (isNoteDialogVisible) {
			setNoteDialogClasses(`note-dialog-visible ${themeClasses}`);
		} else {
			setNoteDialogClasses("");
			hideFontAndPalette();
		}
	}, [isNoteDialogVisible, noteTheme.colour, noteFont]);

	return (
		<form className={`note-dialog ${noteDialogClasses}`}>
			<div onClick={hideFontAndPalette} className="action-buttons">
				<button onClick={closeNoteDialog}>
					<ArrowLeftIcon />
				</button>

				<button onClick={toggleFavourite}
					className="favourite-button"
					disabled={activePage === "trash"}>
						{!noteIsFavourite &&
							<FavouriteIcon />
						}

						{noteIsFavourite &&
							<UnfavouriteIcon />
						}
				</button>
			</div>

			<NoteContent
				activePage={activePage}
				onHideFontAndPalette={hideFontAndPalette}
			/>

			<NoteOptions
				activePage={activePage}
				fontAndPaletteVisibility={fontAndPaletteVisibility}
				onUpdateFontAndPalette={fontAndPaletteHandler}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
			/>
		</form>
	);
}

export default NoteDialog;
