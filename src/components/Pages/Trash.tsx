import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Navbar from "../Common/Navbar";
import CreateNote from "../CreateNote/CreateNote";
import Note from "../Notes/Note";

function Trash() {
    const notes = useSelector((state: RootState) => state.trashedNotes);
    const pageLabel = <b>Trash</b>;
    const buttonLabel = "Empty trash";
    const buttonClass = "empty-trash";

    return (
        <>
            <Navbar 
                pageLabel={pageLabel} 
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                isTrash={true}
            />

            <CreateNote />

            <div className="notes">
                {notes.map((note) => {
                    return <Note
                        key={note.noteId}
                        id={note.noteId}
                        title={note.noteTitle}
                        text={note.noteText}
                        images={note.noteImages}
                        theme={note.noteTheme}
                        font={note.noteFont}
                        favourite={note.noteIsFavourite}
                    />
                })}
            </div>
        </>
    );
}

export default Trash;
