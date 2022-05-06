import { useState } from "react";
import Navbar from "../Common/Navbar";
import CreateNote from "../CreateNote/CreateNote";

function HomePage() {
    const [showCreateNote, setShowCreateNote] = useState(false);
    const pageLabel = <span className="logo"><b>Notes</b><b>Mini</b></span>;
    const buttonLabel = "New note";
    const buttonClass = "create-note-btn";
    
    const createNewNote = (value: boolean) => {
        setShowCreateNote(value);
    }

    const closeNoteDialog = (value: boolean) => {
        setShowCreateNote(value);
    }

    return (
        <div>
            <Navbar 
                pageLabel={pageLabel} 
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                newNote={createNewNote}
            />

            <CreateNote 
                formVisible={showCreateNote} 
                closeNote={closeNoteDialog}
            />
        </div>
    )
}

export default HomePage;
