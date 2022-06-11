import { useLayoutEffect, useState } from "react";
import { useThunkDispatch } from "../../store/store";
import { editNote } from "../../store/thunks/thunks";
import { NoteType } from "../../types/types";
import "../../styles/note/note.scss";

function Note(props: NoteType): JSX.Element {
	const { id, title, text, images, theme, font, isFavourite } = props;
	const [imageColumns, setImageColumns] = useState({columns: ""});
	const thunkDispatch = useThunkDispatch();

	useLayoutEffect(() => {
		if (images.length > 1) {
			setImageColumns({columns: "2"});
		} else {
			setImageColumns({columns: "1"});
		}
	}, [images]);

	const editNoteContent = () => {
		thunkDispatch(editNote({
			id: id,
			title: title,
			text: text,
			images: images,
			theme: theme,
			font: font,
			isFavourite: isFavourite
		}));		
	}

	return (
		<div className={`note ${theme.colour} ${font}`} onClick={editNoteContent}>
			{images.length > 0 &&
				<div className="note-images" style={imageColumns}>
					{images.map((image, index) => (
						<img key={index} src={image} alt="" />
					))}
				</div>
			}

			{title &&
				<h3>{title}</h3>
			}

			<p>{text}</p>
		</div>
	);
}

export default Note;
