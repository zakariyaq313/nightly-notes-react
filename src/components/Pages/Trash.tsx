import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Base/Page";
import SparklesIcon from "../Icons/SparklesIcon";

function Trash() {
	const notes = useSelector((state: RootState) => state.trashedNotes);
	const pageLabel = <b>Trash</b>;
	const emptyNotesClass = "inline-description";
	const emptyNotesInfo = "Trash is empty";
	const emptyNotesIcon = <SparklesIcon/>;

	return (
		<Fragment>
			<Page
				notes={notes}
				activePage="trash"
				pageLabel={pageLabel}
				emptyNotesClass={emptyNotesClass}
				emptyNotesInfo={emptyNotesInfo}
				emptyNotesIcon={emptyNotesIcon}
			/>
		</Fragment>
	);
}

export default Trash;
