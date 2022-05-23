import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Base/Page";
import NotesIcon from "../Icons/NotesIcon";

function HomePage() {
    const notes = useSelector((state: RootState) => state.userNotes);
    const pageLabel = <span className="logo"><b>Notes</b><b>Mini</b></span>;
    const emptyText = "Anything to add?";
    const emptyIcon = <NotesIcon/>;

    return (
        <Fragment>
            <Page
                notes={ notes }
                activePage="home"
                pageLabel={ pageLabel }
                emptyText={ emptyText }
                emptyIcon={ emptyIcon }
            />
        </Fragment>
    )
}

export default HomePage;
