import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import SparklesIcon from "../icons/SparklesIcon";

function Trash(): JSX.Element {
	const notes = useSelector((state: RootState) => state.trashedNotes);
	const pageTitle = {main: "Trash"};
	const notesUnavailableClass = "inline-description";
	const notesUnavailableInfo = "Trash is empty";
	const notesUnavailableIcon = <SparklesIcon/>;

	return (
		<Fragment>
			<BaseComponent notes={notes}
				activePage="trash"
				pageTitle={pageTitle}
				notesUnavailableClass={notesUnavailableClass}
				notesUnavailableInfo={notesUnavailableInfo}
				notesUnavailableIcon={notesUnavailableIcon}
			/>
		</Fragment>
	);
}

export default Trash;
