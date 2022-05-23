import React, { useEffect, useState } from "react";
import CreateNote from "../CreateNote/CreateNote";
import Note from "../Note/Note";
import Navbar from "./Navbar";

type Props = {
    activePage: string,
    pageLabel: React.ReactElement,
    emptyText: string,
    emptyIcon: React.ReactElement,
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
    const { notes, activePage, pageLabel, emptyText, emptyIcon } = props;
    const [ notesEmpty, setNotesEmpty ] = useState(true);
    const emptyClass = (activePage === "home") ? "" : "inline-description";

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
                pageLabel={ pageLabel } 
                activePage={ activePage }
                notesEmpty={ notesEmpty }
            />

            <CreateNote
                activePage={ activePage }
            />

            <div className="notes">
                { notes.map((note) => {
                    return <Note
                        key={ note.noteId }
                        id={ note.noteId }
                        title={ note.noteTitle }
                        text={ note.noteText }
                        images={ note.noteImages }
                        theme={ note.noteTheme }
                        font={ note.noteFont }
                        favourite={ note.noteIsFavourite }
                    />
                })}
            </div>

            { notesEmpty &&
                <div className="notes-unavailable">
                    <h2 className={ emptyClass }>
                        { emptyIcon }
                        <span>{ emptyText }</span>
                    </h2>
                </div>
            }
        </>
    )
}

export default Page;
