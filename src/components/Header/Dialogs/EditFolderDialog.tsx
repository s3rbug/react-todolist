import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, Input } from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/reduxStore";
import { editFolder } from "../../../redux/middleware/todo";
import { FolderType } from "../../../types/index_d";
import { editFolderAction } from "../../../redux/actions/todo";

type PropsType = {
	headline: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	folderId: number;
};

const EditFolderDialog = ({ open, setOpen, headline, folderId }: PropsType) => {
	const dispatch = useDispatch();
	const [newHeadline, setNewHeadline] = useState(headline);
	const currentFolder = useTypedSelector(
		(state) => state.todo.folders[folderId]
	);
	const serverless = useTypedSelector((state) => state.ui.serverless);
	useEffect(() => {
		setNewHeadline(headline);
	}, [headline]);
	const handleClose = () => {
		setNewHeadline(headline);
		setOpen(false);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) setNewHeadline(e.target.value);
	};
	const handleSave = () => {
		if (serverless) dispatch(editFolderAction(newHeadline, folderId));
		else
			dispatch(
				editFolder({ ...currentFolder } as FolderType, newHeadline, folderId)
			);
		handleClose();
	};
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
			<DialogActions>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleSave}>Apply</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default EditFolderDialog;
