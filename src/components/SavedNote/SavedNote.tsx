import { useLayoutEffect, useState } from "react";
import { useThunkDispatch } from "../../store/store";
import { editNote } from "../../store/action-creators/action-creators";
import { NoteType } from "../../types/types";
import "./SavedNote.scss";

function SavedNote(props: NoteType): JSX.Element {
	const {id, title, text, images, theme, font, isFavourite} = props;
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
			{images.length > 0 && (
				<div className="images" style={imageColumns}>
					{images.map((image) => (
						<img key={image} src={image} className="image" alt="" />
					))}
				</div>
			)}

			{title && (<h3 className="title">{title}</h3>)}
			<p className="text">{text}</p>
		</div>
	);
}

export default SavedNote;
