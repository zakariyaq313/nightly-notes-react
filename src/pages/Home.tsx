import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import Notes from "../icons/Notes";

function HomePage(): JSX.Element {
	const notes = useSelector((state: RootState) => state.savedNotes);
	const pageTitle = {main: "Nightly", optional: "Notes"};
	const notesUnavailableInfo = "Anything to add?";
	const notesUnavailableIcon = <Notes />;

	return (
		<BaseComponent notes={notes}
			activePage="home"
			pageTitle={pageTitle}
			notesUnavailableInfo={notesUnavailableInfo}
			notesUnavailableIcon={notesUnavailableIcon}
		/>
	)
}

export default HomePage;
