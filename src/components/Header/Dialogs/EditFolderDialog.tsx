import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, Input } from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton, DeleteDialogButton } from "../../../assets/Buttons";
import { deleteFolder, editFolderHeadline } from "../../../redux/middleware/goal";
import { useTypedDispatch } from "../../../redux/reduxStore";

type PropsType = {
	headline: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	folderId: string;
};

const EditFolderDialog = ({ open, setOpen, headline, folderId }: PropsType) => {
	const [newHeadline, setNewHeadline] = useState(headline);
	const dispatch = useTypedDispatch()

	useEffect(() => {
		setNewHeadline(headline);
	}, [headline]);

	const handleClose = () => {
		setNewHeadline(headline);
		setOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15){
			setNewHeadline(e.target.value);
		}
	};

	const handleSave = () => {
		dispatch(editFolderHeadline(folderId, newHeadline))	
		handleClose();
	};

	const handleDelete = () => {
		dispatch(deleteFolder(folderId))
		handleClose();
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Input
					style={{ fontSize: "1.6em" }}
					value={newHeadline}
					onChange={handleChange}
					autoFocus
				/>
			</DialogTitle>
			<DialogActions style={{ paddingLeft: "24px" }}>
				<DeleteDialogButton onClick={handleDelete}>Delete</DeleteDialogButton>
				<div style={{ flexGrow: 1 }}></div>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleSave}>Apply</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default EditFolderDialog;
