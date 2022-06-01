import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { deleteFromTrash } from "../../store/thunks/thunks";
import { ConfirmDeleteProps } from "../../types/types";

function ConfirmDelete(props: ConfirmDeleteProps) {
	const {deleteConfirmVisible, deleteAmount, onShowDeleteConfirm} = props;
	const thunkDispatch = useAppDispatch();

	const [deleteConfirmClasses, setDeleteConfirmClasses] = useState("");
	const [deletionWarning, setDeletionWarning] = useState("");
	const [deleteButtonText, setDeleteButtonText] = useState("");

	const cancelDelete = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
		if (e.currentTarget === e.target) {
			onShowDeleteConfirm(false);
		}
	}

	const deleteConfirmed = () => {
		thunkDispatch(deleteFromTrash(deleteAmount));
		onShowDeleteConfirm(false);
	}

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
