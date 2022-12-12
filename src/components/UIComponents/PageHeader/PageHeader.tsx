import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../../../store/store";
import Plus from "../../../icons/Plus";
import TrashCan from "../../../icons/TrashCan";
import "./PageHeader.scss";

type Props = {
	activePage: string,
	pageTitle: {main: string, optional?: string},
	notesUnavailable: boolean,
	onShowDeleteConfirm: (value: boolean) => void,
	onSyncDeleteAmount: (value: string) => void
};

function PageHeader(props: Props): JSX.Element {
	const {
		activePage,
		pageTitle,
		notesUnavailable,
		onShowDeleteConfirm,
		onSyncDeleteAmount
	} = props;

	const dispatch = useDispatch();
	const [buttonLabel, setButtonLabel] = useState("");
	const [buttonClass, setButtonClass] = useState("");

	useLayoutEffect(() => {
		if (activePage === "trash") {
			setButtonLabel("Empty Trash");
			setButtonClass("empty-trash-btn");
		} else {
			setButtonLabel("New Note");
			setButtonClass("create-note-btn");
		}
	}, [dispatch, activePage]);

	const buttonAction = () => {
		if (activePage === "trash") {
			onShowDeleteConfirm(true);
			onSyncDeleteAmount("all");
		} else {
			dispatch(noteActions.noteIsNew(true));
			dispatch(noteActions.noteDialogIsVisible(true));
		}
	}

	return (
		<header>
			<h1 className={`page-title ${activePage === "home" ? "app-name" : ""}`}>
				{pageTitle.main}
				{pageTitle.optional && (<span>{pageTitle.optional}</span>)}
			</h1>
			<button onClick={buttonAction}
				className={`comical-shadow-animated ${buttonClass}`}
				disabled={(notesUnavailable && activePage === "trash") || activePage === "favourites"}>

				<span>
					{activePage === "trash" ? <TrashCan /> : <Plus />}
					{buttonLabel}
				</span>
				
				{/* Empty span tags used instead of pseudo elements
				because required animation does not work on the latter */}
				<span></span>
				<span></span>
			</button>
		</header>
	);
}

export default PageHeader;
