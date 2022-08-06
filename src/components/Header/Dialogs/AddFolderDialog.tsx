import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	Input,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";
import { addFolder } from "../../../redux/middleware/goal";
import { useTypedDispatch } from "../../../redux/reduxStore";

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const AddFolderDialog = ({ open, setOpen }: PropsType) => {
	const [headline, setHeadline] = useState("");
	const dispatch = useTypedDispatch()
	const handleClose = () => {
		setOpen(false);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15){
			setHeadline(e.target.value);
		}
	};
	const handleAddFolder = () => {
		dispatch(addFolder(headline))
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
