import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Input, DialogActions } from "@material-ui/core";
import { ApplyDialogButton, CancelDialogButton } from "../../../assets/Buttons";
import { useDispatch } from "react-redux";
import { editTagAction } from "../../../redux/actions/todo";

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	tagName: string;
	tagId: number;
};

const EditTagDialog = ({ open, setOpen, tagId, tagName }: PropsType) => {
	const [newName, setNewName] = useState("");
	const dispatch = useDispatch();

	const editTag = (tagId: number, newName: string) =>
		dispatch(editTagAction(tagId, newName));

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
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Input
					onChange={handleChange}
					value={newName}
					style={{ fontSize: "1.6em" }}
				/>
			</DialogTitle>
			<DialogActions>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleEdit}>Save</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default EditTagDialog;
