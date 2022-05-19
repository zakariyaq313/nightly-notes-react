import React, { useEffect, useState } from "react";
import CreateNote from "../CreateNote/CreateNote";
import Note from "../Note/Note";
import Navbar from "./Navbar";

type Props = {
    pageLabel: React.ReactNode,
    buttonLabel: string,
    buttonClass: string,
    isTrash: boolean,
    emptyText: string,
    emptyIcon: React.ReactNode,
    notes: {
        noteId: string,
        noteTitle: string,
        noteText: string,
        noteImages: string[],
        noteTheme: string,
        noteFont: string,
        noteIsFavourite: boolean
    }[]
};

function Page(props: Props) {
    const {pageLabel, buttonLabel, buttonClass, isTrash, emptyText, emptyIcon, notes} = props;
    const [notesEmpty, setNotesEmpty] = useState(true);

    useEffect(() => {
        if (notes.length > 0) {
            setNotesEmpty(false);
        } else {
            setNotesEmpty(true);
        }
    }, [notes]);

    return (
        <>
            <Navbar 
                pageLabel={pageLabel} 
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
                isTrash={isTrash}
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

            {notesEmpty &&
                <div className="notes-unavailable">
                    <h2>
                        {emptyIcon}
                        <span>{emptyText}</span>
                    </h2>
                </div>
            }
        </>
    )
}

export default Page;
