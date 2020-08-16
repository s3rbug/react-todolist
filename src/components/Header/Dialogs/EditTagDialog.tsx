import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Input, DialogActions } from "@material-ui/core";
import { ApplyDialogButton, CancelDialogButton } from "../../../assets/Buttons";

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	editTag: (tagId: number, newName: string) => void;
	tagName: string;
	tagId: number;
};

const EditTagDialog = ({
	open,
	setOpen,
	editTag,
	tagId,
	tagName,
}: PropsType) => {
	const [newName, setNewName] = useState("");
	useEffect(() => {
		setNewName(tagName);
	}, [tagName]);
	const handleClose = () => {
		setOpen(false);
	};
	const handleEdit = () => {
		editTag(tagId, newName);
		handleClose();
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewName(e.target.value);
	};
	return (
		<Dialog open={open}>
			<DialogTitle>
				<Input
					onChange={handleChange}
					value={newName}
					style={{ fontSize: "1.6em" }}
				/>
			</DialogTitle>
			<DialogActions>
				<ApplyDialogButton onClick={handleClose}>Cancel</ApplyDialogButton>
				<CancelDialogButton onClick={handleEdit}>Save</CancelDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default EditTagDialog;
