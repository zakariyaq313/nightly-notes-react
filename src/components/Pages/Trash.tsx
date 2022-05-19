import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Page from "../Common/Page";
import TrashIcon from "../Icons/TrashIcon";

function Trash() {
    const notes = useSelector((state: RootState) => state.trashedNotes);
    const pageLabel = <b>Trash</b>;
    const buttonLabel = "Empty trash";
    const buttonClass = "empty-trash";
    const emptyText = "Trash is empty";

    return (
        <>
            <Page
                notes={notes}
                pageLabel={pageLabel}
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                emptyText={emptyText}
                emptyIcon={<TrashIcon/>}
                isTrash={true}
            />
        </>
    );
}

export default Trash;
