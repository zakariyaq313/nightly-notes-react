import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavouriteIcon from "../../icons/HeartOutlineIcon";
import HomeIcon from "../../icons/HomeIcon";
import TrashIcon from "../../icons/TrashIcon";
import "../../styles/navigation/navigation.scss";

function Navigation(): JSX.Element {
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
