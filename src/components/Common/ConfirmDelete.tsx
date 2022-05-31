import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../../store/store";
import { ConfirmDeleteProps } from "../../types/types";

function ConfirmDelete(props: ConfirmDeleteProps) {
    const {deleteConfirmVisible, deleteAmount, onShowDeleteConfirm} = props;
    const dispatch = useDispatch();
    const [deleteConfirmClasses, setDeleteConfirmClasses] = useState("");
    const [deletionWarning, setDeletionWarning] = useState("");
    const [deleteButtonText, setDeleteButtonText] = useState("");

    useEffect(() => {
		if (deleteConfirmVisible) {
			setDeleteConfirmClasses("delete-confirm-visible");
		} else {
			setDeleteConfirmClasses("");
		}
	}, [deleteConfirmVisible]);

    useEffect(() => {
        if (deleteAmount === "all") {
            setDeletionWarning("Are you sure you want to delete all notes?");
            setDeleteButtonText("Delete all");
        } else {
            setDeletionWarning("Are you sure you want to delete this note?");
            setDeleteButtonText("Delete");
        }
    }, [deleteAmount]);

    const cancelDelete = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		console.log(e.currentTarget);
		onShowDeleteConfirm(false);
	}

	const deleteConfirmed = () => {
		dispatch(noteActions.deleteNotesForever(deleteAmount));
	}

    return (
        <div onClick={cancelDelete} className={`delete-confirm ${deleteConfirmClasses}`}>
			<div className="confirmation-dialog">
				<strong>{deletionWarning}</strong>
				<div className="delete-confirm-buttons">
					<button className="rising-background" onClick={cancelDelete}>Cancel</button>
					<button className="rising-background" onClick={deleteConfirmed}>{deleteButtonText}</button>
		  		</div>
            </div>
		</div>
    );
}

export default ConfirmDelete;
