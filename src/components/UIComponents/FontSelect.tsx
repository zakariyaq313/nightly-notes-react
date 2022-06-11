import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, noteActions } from "../../store/store";
import "../../styles/font-select/font-select.scss";

function FontSelect(): JSX.Element {
	const fontStyles: {name: string, className: string }[] = [
		{
			name: "Glacial Indifference",
			className: "glacial"
		},
		{
			name: "Montserrat",
			className: "montserrat"
		},
		{
			name: "Major Mono",
			className: "major-mono-display"
		},
		{
			name: "Poppins",
			className: "poppins"
		},
		{
			name: "Raleway",
			className: "raleway"
		},
		{
			name: "Roboto",
			className: "roboto"
		},
		{
			name: "Pacifico",
			className: "pacifico"
		},
		{
			name: "Source Code Pro",
			className: "source-code-pro"
		},
		{
			name: "Hi Melody",
			className: "hi-melody"
		},
		{
			name: "Freckle Face",
			className: "freckle-face"
		},
		{
			name: "Permanent Marker",
			className: "permanent-marker"
		}
	];

	const dispatch = useDispatch();
	const selectedFont = useSelector((state: RootState) => state.noteFont);
	
	const changeFont = (e: React.MouseEvent<HTMLLIElement>, font: string) => {
		e.preventDefault();
		dispatch(noteActions.setNoteFont(font));
	}

	const fontClasses = (fontFamily: string) => {
		if (fontFamily === selectedFont) {
			return `selected-font ${fontFamily}`;
		}

		return fontFamily;
	}

	return(
		<ul className="font-selection-dropdown">
			{fontStyles.map((fontStyle, index) => (
				<li
					key={index}
					className={fontClasses(fontStyle.className)}
					onClick={(e) => changeFont(e, fontStyle.className)}>
					{fontStyle.name}
				</li>
			))}
		</ul>
	);
}

export default FontSelect;
