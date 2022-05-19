import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Common/Page";
import HeartIcon from "../Icons/HeartIcon";

function Favourites() {
    const notes = useSelector((state: RootState) => state.favouriteNotes);
    const pageLabel = <b>Favourites</b>;
    const buttonLabel = "New note";
    const buttonClass = "create-note-btn";
    const emptyText = "No favourite notes";

    return (
        <>
            <Page
                notes={notes}
                pageLabel={pageLabel}
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                emptyText={emptyText}
                emptyIcon={<HeartIcon/>}
                isTrash={false}
            />
        </>
    );
}

export default Favourites;
