import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import HeartColored from "../icons/HeartColored";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import { filterFavourites } from "../store/helper-functions/helper-functions";

function Favourites(): JSX.Element {
	const notes = useSelector((state: RootState) => state.savedNotes);
	const pageTitle = {main: "Favourites"};
	const notesUnavailableClass = "inline-description";
	const notesUnavailableInfo = "No favourite notes";
	const notesUnavailableIcon = <HeartColored />;

	return (
		<BaseComponent notes={filterFavourites(notes)}
			activePage="favourites"
			pageTitle={pageTitle}
			notesUnavailableClass={notesUnavailableClass}
			notesUnavailableInfo={notesUnavailableInfo}
			notesUnavailableIcon={notesUnavailableIcon}
		/>
	);
}

export default Favourites;
