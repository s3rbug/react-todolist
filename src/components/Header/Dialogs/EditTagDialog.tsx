import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Input, DialogActions } from "@material-ui/core";
import {
	ApplyDialogButton,
	CancelDialogButton,
	DeleteDialogButton,
} from "../../../assets/Buttons";
import { deleteTag, editTag } from "../../../redux/middleware/goal";
import { useTypedDispatch } from "../../../redux/reduxStore";

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	tagName: string;
	tagId: string;
};

const EditTagDialog = ({ open, setOpen, tagId, tagName }: PropsType) => {
	const [newName, setNewName] = useState("");
	const dispatch = useTypedDispatch();
	useEffect(() => {
		setNewName(tagName);
	}, [tagName]);

	const handleClose = () => {
		setOpen(false);
	};
	const handleEdit = () => {
		dispatch(editTag(tagId, {name: newName}))
		handleClose();
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setNewName(e.target.value);
		}
	};
	const handleDelete = () => {
		dispatch(deleteTag(tagId))
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Input
					autoFocus
					onChange={handleChange}
					value={newName}
					style={{ fontSize: "1.6em" }}
				/>
			</DialogTitle>
			<DialogActions style={{ paddingLeft: "24px" }}>
				<DeleteDialogButton onClick={handleDelete}>Delete</DeleteDialogButton>
					
				<div style={{ flexGrow: 1 }}></div>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleEdit}>Save</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default EditTagDialog;
