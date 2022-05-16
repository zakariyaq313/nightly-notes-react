import Navbar from "../Common/Navbar";
import CreateNote from "../CreateNote/CreateNote";

function HomePage() {
    const pageLabel = <span className="logo"><b>Notes</b><b>Mini</b></span>;
    const buttonLabel = "New note";
    const buttonClass = "create-note-btn";

    return (
        <div>
            <Navbar 
                pageLabel={pageLabel} 
                buttonLabel={buttonLabel}
                buttonClass={buttonClass}
            />

            <CreateNote />
        </div>
    )
}

export default HomePage;
