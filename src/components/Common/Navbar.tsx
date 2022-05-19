import { useDispatch } from "react-redux";
import { noteActions } from "../../store/store";
import PlusIcon from "../Icons/PlusIcon";
import TrashIcon from "../Icons/TrashIcon";

type NavbarProps = {
    pageLabel: React.ReactNode,
    buttonLabel: string,
    buttonClass: string,
    isTrash: boolean
};

function Navbar(props: NavbarProps) {
    const {pageLabel, buttonLabel, buttonClass, isTrash} = props;
    const dispatch = useDispatch();

    const createNewNote = () => {
        dispatch(noteActions.formVisibility(true));
    }

    return (
        <nav className="navbar">
            <div className="page-label">
                {pageLabel}
            </div>

            <button
                className={`${buttonClass} comical-shadow-clickable`}
                onClick={createNewNote}>
                <span className="rising-background">
                    {!isTrash && <PlusIcon />}
                    {isTrash && <TrashIcon />}
                    {buttonLabel}
                </span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
}

export default Navbar;
