import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import Sparkles from "../icons/Sparkles";

function Trash(): JSX.Element {
	const notes = useSelector((state: RootState) => state.trashedNotes);
	const pageTitle = {main: "Trash"};
	const notesUnavailableClass = "inline-description";
	const notesUnavailableInfo = "Trash is empty";
	const notesUnavailableIcon = <Sparkles/>;

	return (
		<BaseComponent notes={notes}
			activePage="trash"
			pageTitle={pageTitle}
			notesUnavailableClass={notesUnavailableClass}
			notesUnavailableInfo={notesUnavailableInfo}
			notesUnavailableIcon={notesUnavailableIcon}
		/>
	);
}

export default Trash;
