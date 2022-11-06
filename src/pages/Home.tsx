import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import NotesIcon from "../icons/NotesIcon";

function HomePage(): JSX.Element {
	const notes = useSelector((state: RootState) => state.savedNotes);
	const pageTitle = {main: "Nightly", optional: "Notes"};
	const notesUnavailableInfo = "Anything to add?";
	const notesUnavailableIcon = <NotesIcon />;

	return (
		<Fragment>
			<BaseComponent notes={notes}
				activePage="home"
				pageTitle={pageTitle}
				notesUnavailableInfo={notesUnavailableInfo}
				notesUnavailableIcon={notesUnavailableIcon}
			/>
		</Fragment>
	)
}

export default HomePage;
