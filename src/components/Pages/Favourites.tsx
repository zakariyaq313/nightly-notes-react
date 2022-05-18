import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Navbar from "../Common/Navbar";
import CreateNote from "../CreateNote/CreateNote";
import Note from "../Notes/Note";

function Favourites() {
    const notes = useSelector((state: RootState) => state.favouriteNotes);
    const pageLabel = <b>Favourites</b>;
    const buttonLabel = "New note";
    const buttonClass = "create-note-btn";

    return (
        <>
            <Navbar 
                pageLabel={pageLabel} 
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                isTrash={false}
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

export default Favourites;
