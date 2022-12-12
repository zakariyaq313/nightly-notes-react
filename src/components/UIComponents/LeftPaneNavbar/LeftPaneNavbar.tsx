import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeartOutlined from "../../../icons/HeartOutlined";
import Home from "../../../icons/Home";
import TrashCan from "../../../icons/TrashCan";
import "./LeftPaneNavbar.scss";

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
			<button onClick={() => switchPageHandler("home")} title="Home"><Home/></button>
			<button onClick={() => switchPageHandler("favourites")} title="Favourites"><HeartOutlined/></button>
			<button onClick={() => switchPageHandler("trash")} title="Trash"><TrashCan/></button>
		</nav>
	);
}

export default LeftPaneNavbar;
