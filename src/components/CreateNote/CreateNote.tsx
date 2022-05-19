import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noteActions, RootState } from "../../store/store";
import ArrowLeftIcon from "../Icons/ArrowLeftIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import FavouriteIcon from "../Icons/FavouriteIcon";
import UnfavouriteIcon from "../Icons/UnfavouriteIcon";
import ButtonPanel from "./ButtonPanel/ButtonPanel";

function CreateNote() {
  const uploadImageButton = useRef<HTMLInputElement>(null);
  const formVisibility = useSelector((state: RootState) => state.isFormVisible);
  const background = useSelector((state: RootState) => state.noteTheme);
  const fontFamily = useSelector((state: RootState) => state.noteFont);
  const title = useSelector((state: RootState) => state.noteTitle);
  const note = useSelector((state: RootState) => state.noteText);
  const dispatch = useDispatch();

  const [themeState, setTheme] = useState({
    font: false,
    palette: false
  });

  const formClasses = () => {
    let formClassNames: string = `${background} ${fontFamily}`;
    return formVisibility ? `form-visible ${formClassNames}` : formClassNames;
  }

  const themeHandler = (value: {font: boolean, palette: boolean}) => {
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
    dispatch(noteActions.formVisibility(false));
  }

  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(noteActions.currentTitle(e.target.value));
  }

  const getNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(noteActions.currentNote(e.target.value));
  }

  const uploadButtonClicked = () => {
    uploadImageButton.current?.click();
  }

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(noteActions.imageUploaded(URL.createObjectURL(e.target.files[0])));
    }
  }

	return (
		<form className={formClasses()}>
      <div onClick={hideElements} className="upper-half">
        <div className="action-buttons">
          <button onClick={closeNoteDialog}>
            <ArrowLeftIcon />
          </button>

          <button
            disabled
            className="favourite-button">
            <FavouriteIcon />
            <UnfavouriteIcon />
          </button>
        </div>

        <div v-if="imagesPresent" className="images">
          <div className="image">
            <img src="image" className="imageWidth" alt="" />

            <button className="delete-image" disabled>
              <DeleteIcon />              
            </button>
          </div>
        </div>

        <div className="user-inputs">
          <input onChange={getTitle} value={title} placeholder="Title" type="text" spellCheck={false} />
          <textarea onChange={getNote} value={note} placeholder="Your note" spellCheck={false}></textarea>
          <input onChange={uploadImage} ref={uploadImageButton} type="file" accept="image/*" style={{display: "none"}} />
        </div>      
      </div>
        
      <div className="lower-half">
        <ButtonPanel 
          theme={themeState}
          onUpdateTheme={themeHandler}
          onUploadImage={uploadButtonClicked}
        />
      </div>
    </form>
  );
}

export default CreateNote;