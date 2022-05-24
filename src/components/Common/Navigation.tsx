import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouriteIcon from "../Icons/FavouriteIcon";
import HomeIcon from "../Icons/HomeIcon";
import TrashIcon from "../Icons/TrashIcon";

function Navigation() {
	const location = useLocation();
	const navigate = useNavigate();
	const [activePageIndication, setActivePageIndication] = useState("focus-home");
		
	const switchPageHandler = (page: string) => {
		navigate(`/${page}`);
	}

	useEffect(() => {
		setActivePageIndication(`focus-${location.pathname.slice(1)}`);
	}, [location.pathname]);

	return (
		<nav className={`navigation-buttons ${activePageIndication}`}>
			<button onClick={() => {switchPageHandler("home")}} title="Home">
				<HomeIcon />
			</button>

			<button onClick={() => {switchPageHandler("favourites")}} title="Favourites">
				<FavouriteIcon />
			</button>

			<button onClick={() => {switchPageHandler("trash")}} title="Trash">
				<TrashIcon />
			</button>
		</nav>
	);
}

export default Navigation;
