import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Common/Page";
import NotesIcon from "../Icons/NotesIcon";

function HomePage() {
    const notes = useSelector((state: RootState) => state.userNotes);
    const pageLabel = <span className="logo"><b>Notes</b><b>Mini</b></span>;
    const buttonLabel = "New note";
    const buttonClass = "create-note-btn";
    const emptyText = "Anything to add?";

    return (
        <>
            <Page
                notes={notes}
                pageLabel={pageLabel}
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                emptyText={emptyText}
                emptyIcon={<NotesIcon/>}
                isTrash={false}
            />
        </>
    )
}

export default HomePage;
