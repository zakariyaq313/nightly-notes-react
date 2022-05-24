import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Base/Page";
import HeartIcon from "../Icons/HeartIcon";

function Favourites() {
	const notes = useSelector((state: RootState) => state.favouriteNotes);
	const pageLabel = <b>Favourites</b>;
	const emptyNotesClass = "inline-description";
	const emptyNotesInfo = "No favourite notes";
	const emptyNotesIcon = <HeartIcon/>;

	return (
		<Fragment>
			<Page
				notes={notes}
				activePage="favourites"
				pageLabel={pageLabel}
				emptyNotesClass={emptyNotesClass}
				emptyNotesInfo={emptyNotesInfo}
				emptyNotesIcon={emptyNotesIcon}
			/>
		</Fragment>
	);
}

export default Favourites;
