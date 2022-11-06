import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState, useThunkDispatch } from "../../store/store";
import { exitNoteDialog } from "../../store/action-creators/action-creators";
import NoteContent from "./NoteContent/NoteContent";
import NoteOptions from "./NoteOptions/NoteOptions";
import ArrowLeftIcon from "../../icons/ArrowLeftIcon";
import HeartOutlineIcon from "../../icons/HeartOutlineIcon";
import HeartFilledIcon from "../../icons/HeartFilledIcon";
import { ElementsVisible } from "../../types/types";
import "../../sass/note-dialog/note-dialog.scss";

type Props = {
	activePage: string,
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void
};

function NoteDialog(props: Props): JSX.Element {
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
	const [elementsVisible, setElementsVisible] = useState({
		fontSelect: false,
		themePalette: false
	});

	const updateElementsVisibility = (visibility: ElementsVisible) => {
		setElementsVisible({
			fontSelect: visibility.fontSelect,
			themePalette: visibility.themePalette
		});
	}

	const hideFontAndPalette = () => {
		setElementsVisible({
			fontSelect: false,
			themePalette: false
		});
	}

	const closeNoteDialog = (e: React.MouseEvent) => {
		e.preventDefault();
		thunkDispatch(exitNoteDialog(activePage));
	}

	const toggleFavourite = (e: React.MouseEvent) => {
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
				<button onClick={closeNoteDialog} className="close-button"><ArrowLeftIcon/></button>
				<button onClick={toggleFavourite} className="favourite-button" disabled={activePage === "trash"}>
					{noteIsFavourite ? <HeartFilledIcon /> : <HeartOutlineIcon />}
				</button>
			</div>

			<NoteContent activePage={activePage}
				onHideFontAndPalette={hideFontAndPalette}
			/>

			<NoteOptions activePage={activePage}
				elementsVisible={elementsVisible}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
				onUpdateElementsVisibility={updateElementsVisibility}
			/>
		</form>
	);
}

export default NoteDialog;
