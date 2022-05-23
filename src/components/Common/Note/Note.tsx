import { useDispatch } from "react-redux";
import { noteActions } from "../../../store/store";

type NoteProps = {
    id: string,
    title: string,
    content: string,
    images: string[],
    theme: string,
    font: string,
    favourite: boolean
};

function Note(props: NoteProps) {
    const { id, title, content, images, theme, font, favourite } = props;
    const dispatch = useDispatch();
    const editNote = () => {
        dispatch(noteActions.editingNote({
            id: id,
            title: title,
            content: content,
            images: images,
            theme: theme,
            font: font,
            favourite: favourite
        }));
    }

    return (
        <div className={`note ${theme} ${font}`} onClick={editNote}>
            <div className="note-images">
                {images.map((image, index) => {
                    return <img key={index} src={image} alt="" />
                })}
            </div>
            <h3>{ title }</h3>
            <p>{ content }</p>
        </div>
    );
}

export default Note;
