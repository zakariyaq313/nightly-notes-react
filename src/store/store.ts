import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Note = {
    note: {
        noteId: string
        noteTitle: string,
        noteText: string,
        noteImages: string[],
        noteTheme: string,
        noteFont: string,
        noteIsFavourite: boolean
    }
};

type InitialState = {
    userNotes: Note[],
    favouriteNotes: Note[],
    trashedNotes: Note[],
    isNoteEmpty: boolean,
    isNoteNew: boolean,
    isFormVisible: boolean,
    noteId: string,
    noteTitle: string,
    noteText: string,
    noteImages: string[],
    noteTheme: string,
    noteFont: string,
    noteIsFavourite: boolean
};

const initialState: InitialState = {
    userNotes: [],
    favouriteNotes: [],
    trashedNotes: [],
    isNoteEmpty: true,
    isNoteNew: true,
    isFormVisible: false,
    noteId: "",
    noteTitle: "",
    noteText: "",
    noteImages: [],
    noteTheme: "dark",
    noteFont: "roboto",
    noteIsFavourite: false
};

const noteStateSlice = createSlice({
    name: "Notes",
    initialState,
    reducers: {
        formVisibility(state, action: PayloadAction<boolean>) {
            state.isFormVisible = action.payload;
        },
        
        currentTitle(state, action: PayloadAction<string>) {
            state.noteTitle = action.payload;
        },

        currentNote(state, action: PayloadAction<string>) {
            state.noteText = action.payload;
        },

        imageUploaded(state, action: PayloadAction<string>) {
            state.noteImages.push(action.payload);
        },

        // createOrTrash(state, action) {
        //     let collection;

        //     if (action.payload === "create") {
        //         collection = state.userNotes;
        //     } else if(action.payload === "trash"){
        //         collection = state.trashedNotes;
        //     }

        //     collection.unshift({
        //         id: new Date().toISOString(),
        //         title: state.noteTitle,
        //         text: state.noteText,
        //         images: state.noteImages,
        //         theme: state.noteTheme,
        //         font: state.noteFont,
        //         favourite: state.noteIsFavourite
        //     });        
        // },

        editingNote(state, action) {
            state.noteId = action.payload.id;
            state.noteTitle = action.payload.title;
            state.noteText = action.payload.text;
            state.noteImages = action.payload.images;
            state.noteTheme = action.payload.theme;
            state.noteFont = action.payload.font;
            state.noteIsFavourite = action.payload.favourite;
        },

        updateNote(state, action) {
            let noteFound = action;
            Object.assign(noteFound, {
                title: state.noteTitle,
                text: state.noteText,
                images: state.noteImages,
                theme: state.noteTheme,
                font: state.noteFont,
                favourite: state.noteIsFavourite
            });
        },

        resetNote(state) {
            state.noteId = "";
            state.noteTitle = "";
            state.noteText = "";
            state.noteImages = [];
            state.noteTheme = "dark";
            state.noteFont = "roboto";
            state.noteIsFavourite = false;
        },

        // trashNote(state, action) {
        //     state.trashedNotes.unshift(action.payload);
        //     state.favouriteNotes = state.favouriteNotes.filter(note => note.id !== action.id);
        //     state.userNotes = state.userNotes.filter(note => note.id !== action.id);
        // },

        // removeEmptyNote(state) {
        //     state.userNotes = state.userNotes.filter(note => note.id !== state.noteId);
        // },

        // restoreNote(state) {
        //     let noteFound = state.trashedNotes.find(note => note.id === state.noteId);
        //     state.userNotes.unshift(noteFound);
        //     state.trashedNotes = state.trashedNotes.filter(note => note.id !== noteFound.id);
        // },

        // deleteNotes(state, action) {
        //     if (action.payload === "delete-one") {
        //         state.trashedNotes = state.trashedNotes.filter(note => note.id !== state.noteId);
        //     } else if (action.payload === "delete-all") {
        //         state.trashedNotes = [];
        //     }
        // },

        setTheme(state, action: PayloadAction<string>) {
            state.noteTheme = action.payload;
        },

        setFont(state, action: PayloadAction<string>) {
            state.noteFont = action.payload;
        },

        // noteEmpty(state, action) {
        //     state.isNoteEmpty = action.payload;
        // },

        // newNote(state, action) {
        //     state.isNoteNew = action.payload;
        // },

        // deleteImages(state, action) {
        //     state.noteImages.splice(action.payload, 1);
        // },

        // toggleFavouriteStatus(state) {
        //     state.noteIsFavourite = !state.noteIsFavourite;
        // },

        // addFavouriteNotes(state) {
        //     state.favouriteNotes = state.userNotes.filter(note => note.favourite === true);
        // }
    }
})

const store = configureStore({
    reducer: noteStateSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export const noteActions = noteStateSlice.actions;
export default store;
