import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../../store/store";
import { NavbarProps } from "../../types/types";
import PlusIcon from "../Icons/PlusIcon";
import TrashIcon from "../Icons/TrashIcon";

function Navbar(props: NavbarProps) {
	const {
		activePage,
		pageLabel,
		notesEmpty,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const dispatch = useDispatch();
	
	const [buttonLabel, setButtonLabel] = useState("");
	const [buttonClass, setButtonClass] = useState("");
	const [buttonAction, setButtonAction] = useState(() => () => {});

	useEffect(() => {
		const createNewNote = () => {
			dispatch(noteActions.noteDialogIsVisible(true));
			dispatch(noteActions.noteIsNew(true));
		}

		const showDeleteConfirm = () => {
			onShowDeleteConfirm(true);
			onSyncDeleteAmount("all");
		}

		if (activePage === "trash") {
			setButtonLabel("Empty Trash");
			setButtonClass("empty-trash");
			setButtonAction(() => showDeleteConfirm);
		} else {
			setButtonLabel("New Note");
			setButtonClass("create-note-btn");
			setButtonAction(() => createNewNote);
		}
	}, [dispatch, activePage, onShowDeleteConfirm, onSyncDeleteAmount]);

	return (
		<nav className="navbar">
			<div className="page-label">
				{pageLabel}
			</div>

			<button
				onClick={buttonAction}
				className={`${ buttonClass } comical-shadow-clickable`}
				disabled={(notesEmpty && activePage === "trash") || activePage === "favourites"}>
				<span className="rising-background">
					{activePage !== "trash" && <PlusIcon />}
					{activePage === "trash" && <TrashIcon />}
					{buttonLabel}
				</span>
				<span></span>
				<span></span>
			</button>
		</nav>
	);
}

export default Navbar;
