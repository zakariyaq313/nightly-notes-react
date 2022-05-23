import { useDispatch } from "react-redux";
import { noteActions } from "../../store/store";
import PlusIcon from "../Icons/PlusIcon";
import TrashIcon from "../Icons/TrashIcon";

type NavbarProps = {
    activePage: string,
    pageLabel: React.ReactNode,
    notesEmpty: boolean
};

function Navbar(props: NavbarProps) {
    const { activePage, pageLabel, notesEmpty } = props;
    const dispatch = useDispatch();
    const buttonLabel = (activePage === "trash") ? "Empty Trash" : "New Note";
    const buttonClass = (activePage === "trash") ? "empty-trash" : "create-note-btn";

    const createNewNote = () => {
        dispatch(noteActions.formVisibility(true));
    }

    return (
        <nav className="navbar">
            <div className="page-label">
                { pageLabel }
            </div>

            <button
                onClick={ createNewNote }
                className={ `${ buttonClass } comical-shadow-clickable` }
                disabled={ (notesEmpty && activePage === "trash") || activePage === "favourites" }>
                <span className="rising-background">
                    { activePage !== "trash" && <PlusIcon/> }
                    { activePage === "trash" && <TrashIcon/> }
                    { buttonLabel }
                </span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
}

export default Navbar;
