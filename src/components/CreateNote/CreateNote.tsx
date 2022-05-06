import React, { useState } from "react";
import ButtonPanel from "./ButtonPanel/ButtonPanel";

type CreateNoteProps = {
  formVisible: boolean,
  closeNote: (value: boolean) => void
};

function CreateNote(props: CreateNoteProps) {
  const [themeState, setTheme] = useState({
    font: false,
    palette: false
  });

  const themeHandler = (value: { font: boolean, palette: boolean }) => {
    setTheme({
      font: value.font,
      palette: value.palette
    });
  }

  const hideElements = () => {
    setTheme({
      font: false,
      palette: false
    });
  }

  const closeNoteDialog = (e: React.FormEvent) => {
    e.preventDefault();
    props.closeNote(false);
  }

	return (
		<form className={ props.formVisible ? "form-visible" : "" }>
      <div onClick={ hideElements } className="upper-half">
        <div className="action-buttons">
          <button onClick={closeNoteDialog}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          </button>

          <button
            disabled
            className="favourite-button">
            <svg className="favourite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            <svg className="unfavourite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"/></svg>
          </button>
        </div>

        <div v-if="imagesPresent" className="images">
          <div className="image">
            <img src="image" className="imageWidth" alt="" />

            <button className="delete-image" disabled>
              <svg viewBox="0 0 24 24"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
            </button>
          </div>
        </div>

        <div className="user-inputs">
          <input type="text" placeholder="Title" spellCheck={false} />
          <textarea placeholder="Your note" spellCheck={false}></textarea>
          <input type="file" accept="image/*" style={{display: "none"}} />
        </div>      
      </div>
        
      <div className="lower-half">
        <ButtonPanel 
          theme={ themeState }
          onUpdateTheme={ themeHandler } />
      </div>
    </form>
  );
}

export default CreateNote;