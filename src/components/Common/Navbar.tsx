import { useDispatch } from "react-redux";
import { noteActions } from "../../store/store";

type NavbarProps = {
    pageLabel: React.ReactNode,
    buttonLabel: string,
    buttonClass: string,
};

function Navbar(props: NavbarProps) {
    const {pageLabel, buttonLabel, buttonClass} = props;
    const dispatch = useDispatch();

    const createNewNote = () => {
        dispatch(noteActions.formVisibility(true));
    }

    return (
        <nav className="navbar">
            <div className="page-label">
                { pageLabel }
            </div>

            <div>
                <button 
                    className={`${buttonClass} comical-shadow-clickable`}
                    onClick={createNewNote}>
                    <span className="rising-background">
                        <svg viewBox="0 0 512 512" enableBackground="new 0 0 512 512"><g><path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/></g></svg>
                        { buttonLabel }
                    </span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
