import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouriteIcon from "../../icons/HeartOutlineIcon";
import HomeIcon from "../../icons/HomeIcon";
import TrashIcon from "../../icons/TrashIcon";
import "../../sass/left-pane-navbar/left-pane-navbar.scss";

function LeftPaneNavbar(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const [focusedPage, setFocusedPage] = useState("focus-home");
		
	const switchPageHandler = (page: string) => {
		navigate(`/${page}`);
	}

	useEffect(() => {
		setFocusedPage(`focus-${location.pathname.slice(1)}`);
	}, [location.pathname]);

	return (
		<nav className={`navigation-buttons ${focusedPage}`}>
			<button onClick={() => switchPageHandler("home")} title="Home"><HomeIcon/></button>
			<button onClick={() => switchPageHandler("favourites")} title="Favourites"><FavouriteIcon/></button>
			<button onClick={() => switchPageHandler("trash")} title="Trash"><TrashIcon/></button>
		</nav>
	);
}

export default LeftPaneNavbar;
