import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../../../store/store";
import { NoteType } from "../../../types/types";

function Note (props: NoteType) {
	const { id, title, content, images, theme, font, isFavourite } = props;
	const [imageColumns, setImageColumns] = useState({columns: "1"});
	const dispatch = useDispatch();

	useEffect(() => {
		if (images.length > 1) {
			setImageColumns({columns: "2"});
		} else {
			setImageColumns({columns: "1"});
		}
	}, [images]);

	const editNote = () => {
		dispatch(noteActions.editNote({
			id: id,
			title: title,
			content: content,
			images: images,
			theme: theme,
			font: font,
			isFavourite: isFavourite
		}));
		dispatch(noteActions.noteIsNew(false));
		dispatch(noteActions.noteDialogIsVisible(true));
	}

	return (
		<div className={`note ${theme} ${font}`} onClick={editNote}>
			{images.length > 0 &&
				<div className="note-images" style={imageColumns}>
					{images.map((image, index) => (
						<img key={index} src={image} alt="" />
					))}
				</div>
			}

			{title && <h3>{title}</h3>}

			<p>{content}</p>
		</div>
	);
}

export default Note;
