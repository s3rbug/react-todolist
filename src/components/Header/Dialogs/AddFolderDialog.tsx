import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	Input,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/reduxStore";
import { GoalType } from "../../../types/index_d";
import { addFolder } from "../../../redux/middleware/todo";

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const AddFolderDialog = ({ open, setOpen }: PropsType) => {
	const [headline, setHeadline] = useState("");
	const dispatch = useDispatch();
	const folders = useTypedSelector((state) => state.todo.folders);
	const handleClose = () => {
		setOpen(false);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) setHeadline(e.target.value);
	};
	const handleAddFolder = () => {
		dispatch(
			addFolder({
				id: folders.length,
				headline: headline,
				shown: false,
				goals: [] as GoalType[],
			})
		);
		setHeadline("");
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<span style={{ fontSize: "1.6em" }}>Add folder</span>
			</DialogTitle>
			<DialogContent>
				<Input
					style={{ fontSize: "1.5em" }}
					placeholder="Folder name"
					value={headline}
					autoFocus
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleAddFolder}>Add</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default AddFolderDialog;
