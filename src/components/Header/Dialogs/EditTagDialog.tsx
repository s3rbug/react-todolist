import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Input, DialogActions } from "@material-ui/core";
import {
	ApplyDialogButton,
	CancelDialogButton,
	DeleteDialogButton,
} from "../../../assets/Buttons";
import { useDispatch } from "react-redux";
import { deleteTagAction, editTagAction } from "../../../redux/actions/todo";
import { editTag } from "../../../redux/middleware/todo";
import { useTypedSelector } from "../../../redux/reduxStore";

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	tagName: string;
	tagId: number;
};

const EditTagDialog = ({ open, setOpen, tagId, tagName }: PropsType) => {
	const [newName, setNewName] = useState("");
	const dispatch = useDispatch();
	const deleteTag = (tagId: number) => dispatch(deleteTagAction(tagId));
	const tag = useTypedSelector((state) => state.todo.tags[tagId]);
	const serverless = useTypedSelector((state) => state.ui.serverless);
	useEffect(() => {
		setNewName(tagName);
	}, [tagName]);

	const handleClose = () => {
		setOpen(false);
	};
	const handleEdit = () => {
		if (serverless) dispatch(editTagAction(tagId, newName));
		else dispatch(editTag(tagId, newName, tag.color));
		handleClose();
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) setNewName(e.target.value);
	};
	const handleDelete = () => {
		handleClose();
		if (serverless) deleteTag(tagId);
		else {
			// TODO
		}
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
