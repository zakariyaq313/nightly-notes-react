export type NoteType = {
	id: string,
	title: string,
	content: string,
	images: string[],
	theme: string,
	font: string,
	isFavourite: boolean
};

export type InitialState = {
	userNotes: NoteType[],
	favouriteNotes: NoteType[],
	trashedNotes: NoteType[],
	isNoteEmpty: boolean,
	isNoteNew: boolean,
	isFormVisible: boolean,
	noteId: string,
	noteTitle: string,
	noteContent: string,
	noteImages: string[],
	noteTheme: string,
	noteFont: string,
	noteIsFavourite: boolean
};

export type NavbarProps = {
	activePage: string,
	pageLabel: React.ReactNode,
	notesEmpty: boolean,
	onShowDeleteConfirm: (value: boolean) => void,
	onSetDeleteAmount: (value: string) => void
};

export type PageProps = {
	activePage: string,
	pageLabel: React.ReactElement,
	emptyNotesClass: string,
	emptyNotesInfo: string,
	emptyNotesIcon: React.ReactElement,
	notes: NoteType[]
};

export type NoteDialogProps = {
	activePage: string,
	onShowDeleteConfirm: (value: boolean) => void,
	onSetDeleteAmount: (value: string) => void
};

export type ButtonPanelProps = {
	activePage: string,
	themeOptions: {fontSelect: boolean, palette: boolean},
	onUpdateThemeOptions: (value: {fontSelect: boolean, palette: boolean}) => void,
	onUploadImage: () => void,
	onShowDeleteConfirm: (value: boolean) => void,
	onSetDeleteAmount: (value: string) => void
};

export type ConfirmDeleteProps = {
	deleteConfirmVisible: boolean,
	deleteAmount: string,
	onShowDeleteConfirm: (value: boolean) => void
};
