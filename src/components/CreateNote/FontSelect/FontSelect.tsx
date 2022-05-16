import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, noteActions } from "../../../store/store";

function FontSelect() {
  const fontStyles: { name: string, class: string }[] = [
    {
      name: "Roboto",
      class: "roboto"
    },
    {
      name: "Montserrat",
      class: "montserrat"
    },
    {
      name: "Comfortaa",
      class: "comfortaa"
    },
    {
      name: "Major Mono",
      class: "major-mono-display"
    },
    {
      name: "Source Code Pro",
      class: "source-code-pro"
    },
    {
      name: "Poppins",
      class: "poppins"
    },
    {
      name: "Raleway",
      class: "raleway"
    },
    {
      name: "Pacifico",
      class: "pacifico"
    },
    {
      name: "Hi Melody",
      class: "hi-melody"
    },
    {
      name: "Patrick Hand",
      class: "patrick-hand"
    },
    {
      name: "Freckle Face",
      class: "freckle-face"
    },
    {
      name: "Permanent Marker",
      class: "permanent-marker"
    }
  ];

  const dispatch = useDispatch();
  const selectedFont = useSelector((state: RootState) => state.noteFont);
  const changeFont = (e: React.FormEvent, font: string) => {
    e.preventDefault();
    dispatch(noteActions.setFont(font));
  }

  const fontClasses = (fontFamily: string) => {
    if (fontFamily === selectedFont) {
      return `selected-font ${fontFamily}`;
    }

    return fontFamily;
  }

  return(
    <ul className="font-selection-dropdown">
      {fontStyles.map((fontStyle, index) => {
        return <li
          key={index}
          className={fontClasses(fontStyle.class)}
          onClick={(e) => changeFont(e, fontStyle.class)}>
            {fontStyle.name}
        </li>
      })}
    </ul>
  );
}

export default FontSelect;
