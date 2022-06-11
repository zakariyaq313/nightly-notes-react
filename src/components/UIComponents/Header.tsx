import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../../store/store";
import { HeaderProps } from "../../types/types";
import PlusIcon from "../../icons/PlusIcon";
import TrashIcon from "../../icons/TrashIcon";
import "../../styles/header/header.scss";

function Header(props: HeaderProps): JSX.Element {
	const {
		activePage,
		pageLabel,
		notesUnavailable,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const dispatch = useDispatch();
	
	const [buttonLabel, setButtonLabel] = useState("");
	const [buttonClass, setButtonClass] = useState("");
	const [buttonAction, setButtonAction] = useState(() => () => {});

	useLayoutEffect(() => {
		const createNewNote = () => {
			dispatch(noteActions.noteIsNew(true));
			dispatch(noteActions.noteDialogIsVisible(true));
		}

		const showDeleteConfirm = () => {
			onShowDeleteConfirm(true);
			onSyncDeleteAmount("all");
		}

		if (activePage === "trash") {
			setButtonLabel("Empty Trash");
			setButtonClass("empty-trash-btn");
			setButtonAction(() => showDeleteConfirm);
		} else {
			setButtonLabel("New Note");
			setButtonClass("create-note-btn");
			setButtonAction(() => createNewNote);
		}
	}, [dispatch, activePage, onShowDeleteConfirm, onSyncDeleteAmount]);

	return (
		<header>
			<div className="page-label">
				{pageLabel}
			</div>

			<button
				onClick={buttonAction}
				className={`comical-shadow-clickable ${buttonClass}`}
				disabled={(notesUnavailable && activePage === "trash") || activePage === "favourites"}>

				<span>
					{activePage !== "trash" && <PlusIcon />}
					{activePage === "trash" && <TrashIcon />}
					{buttonLabel}
				</span>
				
				{/* Empty span tags used instead of pseudo elements because
					required animation does not work on the latter */}
				<span></span>
				<span></span>
			</button>
		</header>
	);
}

export default Header;
