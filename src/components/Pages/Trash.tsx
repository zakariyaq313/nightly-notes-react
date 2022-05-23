import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Common/Page";
import SparklesIcon from "../Icons/SparklesIcon";

function Trash() {
    const notes = useSelector((state: RootState) => state.trashedNotes);
    const pageLabel = <b>Trash</b>;
    const emptyText = "Trash is empty";
    const emptyIcon = <SparklesIcon/>;

    return (
        <Fragment>
            <Page
                notes={ notes }
                activePage="trash"
                pageLabel={ pageLabel }
                emptyText={ emptyText }
                emptyIcon={ emptyIcon }
            />
        </Fragment>
    );
}

export default Trash;
