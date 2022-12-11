import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState, useThunkDispatch } from "../../store/store";
import { exitNoteDialog } from "../../store/action-creators/action-creators";
import NoteContent from "../UIComponents/NoteContent/NoteContent";
import NoteOptions from "../UIComponents/NoteOptions/NoteOptions";
import ArrowLeft from "../../icons/ArrowLeft";
import HeartFilled from "../../icons/HeartFilled";
import HeartOutlined from "../../icons/HeartOutlined";
import { VisibleElements } from "../../types/types";
import "./NoteDialog.scss";

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
	const [visibleElements, setVisibleElements] = useState({
		fontSelect: false,
		themePalette: false
	});

	const updateElementsVisibility = (visibility: VisibleElements) => {
		setVisibleElements({
			fontSelect: visibility.fontSelect,
			themePalette: visibility.themePalette
		});
	}

	const hideFontAndPalette = () => {
		setVisibleElements({
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
				<button onClick={closeNoteDialog} className="close-button"><ArrowLeft/></button>
				<button onClick={toggleFavourite} className="favourite-button" disabled={activePage === "trash"}>
					{noteIsFavourite ? <HeartFilled /> : <HeartOutlined />}
				</button>
			</div>

			<NoteContent activePage={activePage}
				onHideFontAndPalette={hideFontAndPalette}
			/>

			<NoteOptions activePage={activePage}
				visibleElements={visibleElements}
				onShowDeleteConfirm={showDeleteConfirm}
				onSyncDeleteAmount={syncDeleteAmount}
				onUpdateElementsVisibility={updateElementsVisibility}
			/>
		</form>
	);
}

export default NoteDialog;
