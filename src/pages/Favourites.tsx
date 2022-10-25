import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BaseComponent from "../components/BaseComponent/BaseComponent";
import HeartIcon from "../icons/HeartIcon";

function Favourites(): JSX.Element {
	const notes = useSelector((state: RootState) => state.favouriteNotes);
	const pageTitle = {main: "Favourites"};
	const notesUnavailableClass = "inline-description";
	const notesUnavailableInfo = "No favourite notes";
	const notesUnavailableIcon = <HeartIcon />;

	return (
		<Fragment>
			<BaseComponent
				notes={notes}
				activePage="favourites"
				pageTitle={pageTitle}
				notesUnavailableClass={notesUnavailableClass}
				notesUnavailableInfo={notesUnavailableInfo}
				notesUnavailableIcon={notesUnavailableIcon}
			/>
		</Fragment>
	);
}

export default Favourites;
