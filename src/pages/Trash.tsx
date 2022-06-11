import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import SparklesIcon from "../icons/SparklesIcon";

function Trash(): JSX.Element {
	const notes = useSelector((state: RootState) => state.trashedNotes);
	const pageLabel = <b>Trash</b>;
	const notesUnavailableClass = "inline-description";
	const notesUnavailableInfo = "Trash is empty";
	const notesUnavailableIcon = <SparklesIcon/>;

	return (
		<Fragment>
			<BaseComponent
				notes={notes}
				activePage="trash"
				pageLabel={pageLabel}
				notesUnavailableClass={notesUnavailableClass}
				notesUnavailableInfo={notesUnavailableInfo}
				notesUnavailableIcon={notesUnavailableIcon}
			/>
		</Fragment>
	);
}

export default Trash;
