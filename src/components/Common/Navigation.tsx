import FavouriteIcon from "../Icons/FavouriteIcon";
import HomeIcon from "../Icons/HomeIcon";
import TrashIcon from "../Icons/TrashIcon";

function Navigation() {
    return (
        <nav className="navigation-buttons">
            <button className="home" title="Home">
                <HomeIcon />
            </button>

            <button className="favourites" title="Favourites">
                <FavouriteIcon />
            </button>

            <button className="trash" title="Trash">
                <TrashIcon />
            </button>
        </nav>
    );
}

export default Navigation;
