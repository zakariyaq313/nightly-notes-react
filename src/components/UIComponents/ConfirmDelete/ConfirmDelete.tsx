import { useEffect, useState } from "react";
import { useThunkDispatch } from "../../../store/store";
import { deleteFromTrash } from "../../../store/action-creators/action-creators";
import "./ConfirmDelete.scss";

type Props = {
	deleteConfirmVisible: boolean,
	deleteAmount: string,
	onShowDeleteConfirm: (value: boolean) => void
};

function ConfirmDelete(props: Props): JSX.Element {
	const {
		deleteConfirmVisible,
		deleteAmount,
		onShowDeleteConfirm
	} = props;
	const thunkDispatch = useThunkDispatch();

	const [deleteConfirmClasses, setDeleteConfirmClasses] = useState("");
	const [deleteWarning, setDeleteWarning] = useState("");
	const [deleteButtonText, setDeleteButtonText] = useState("");

	const cancelDelete = (e: React.MouseEvent) => {
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
			setDeleteWarning("Are you sure you want to delete all notes?");
			setDeleteButtonText("Delete all");
		} else {
			setDeleteWarning("Are you sure you want to delete this note?");
			setDeleteButtonText("Delete");
		}
	}, [deleteAmount]);

	return (
		<div onClick={(e) => cancelDelete(e)} className={`delete-confirm ${deleteConfirmClasses}`}>
			<div className="confirmation-dialog">
				<strong>{deleteWarning}</strong>
				<div className="delete-confirm-buttons">
					<button className="rising-background" onClick={(e) => cancelDelete(e)}>Cancel</button>
					<button className="rising-background" onClick={deleteConfirmed}>{deleteButtonText}</button>
		  		</div>
			</div>
		</div>
	);
}

export default ConfirmDelete;
