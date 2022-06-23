import { useEffect, useState } from "react";
import { useThunkDispatch } from "../../store/store";
import { deleteFromTrash } from "../../store/action-creators/action-creators";
import { ConfirmDeleteProps } from "../../types/types";
import "../../styles/confirm-delete/confirm-delete.scss";

function ConfirmDelete(props: ConfirmDeleteProps): JSX.Element {
	const {deleteConfirmVisible, deleteAmount, onShowDeleteConfirm} = props;
	const thunkDispatch = useThunkDispatch();

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
					<button className="rising-background"
						onClick={cancelDelete}>
							Cancel
					</button>
					
					<button className="rising-background"
						onClick={deleteConfirmed}>
							{deleteButtonText}
					</button>
		  		</div>
			</div>
		</div>
	);
}

export default ConfirmDelete;
