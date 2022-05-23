import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import CreateNote from "../Common/CreateNote/CreateNote";
import Note from "../Common/Note/Note";

type Props = {
    activePage: string,
    pageLabel: React.ReactElement,
    emptyText: string,
    emptyIcon: React.ReactElement,
    notes: {
        noteId: string,
        noteTitle: string,
        noteContent: string,
        noteImages: string[],
        noteTheme: string,
        noteFont: string,
        noteIsFavourite: boolean
    }[]
};

function Page(props: Props) {
    const [ notesEmpty, setNotesEmpty ] = useState(true);
    const { notes, activePage, pageLabel, emptyText, emptyIcon } = props;
    const emptyClass = (activePage === "home") ? "" : "inline-description";

    const closeNote = () => {

    }

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

            <div onClick={ closeNote } className="['overlay', overlayVisible]"></div>
            <div className="['background-blur', blurOverlayClasses]"></div>

            <CreateNote
                activePage={ activePage }
            />

            <div className="notes">
                { notes.map((note) => {
                    return <Note
                        key={ note.noteId }
                        id={ note.noteId }
                        title={ note.noteTitle }
                        content={ note.noteContent }
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
