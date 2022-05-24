import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Base/Page";
import NotesIcon from "../Icons/NotesIcon";

function HomePage() {
	const notes = useSelector((state: RootState) => state.userNotes);
	const pageLabel = <span className="logo"><b>Notes</b><b>Mini</b></span>;
	const emptyNotesInfo = "Anything to add?";
	const emptyNotesIcon = <NotesIcon/>;

	return (
		<Fragment>
			<Page
				notes={notes}
				activePage="home"
				pageLabel={pageLabel}
				emptyNotesClass={""}
				emptyNotesInfo={emptyNotesInfo}
				emptyNotesIcon={emptyNotesIcon}
			/>
		</Fragment>
	)
}

export default HomePage;
