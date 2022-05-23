import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Common/Page";
import HeartIcon from "../Icons/HeartIcon";

function Favourites() {
    const notes = useSelector((state: RootState) => state.favouriteNotes);
    const pageLabel = <b>Favourites</b>;
    const emptyText = "No favourite notes";
    const emptyIcon = <HeartIcon/>;

    return (
        <Fragment>
            <Page
                notes={ notes }
                activePage="favourites"
                pageLabel={ pageLabel }
                emptyText={ emptyText }
                emptyIcon={ emptyIcon }
            />
        </Fragment>
    );
}

export default Favourites;
