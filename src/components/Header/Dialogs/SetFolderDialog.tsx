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
import { addFolderAction } from "../../../redux/actions/todo";

type PropsType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const SetFolderDialog = ({ open, setOpen }: PropsType) => {
    const [headline, setHeadline] = useState("");
    const dispatch = useDispatch();
    const addFolder = (folderName: string) =>
        dispatch(addFolderAction(folderName));

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e: any) => {
        setHeadline(e.target.value);
    };
    const handleAddFolder = () => {
        addFolder(headline);
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
                    style={{ fontSize: "1.3em" }}
                    placeholder="Folder name"
                    value={headline}
                    autoFocus
                    onChange={handleChange}
                ></Input>
            </DialogContent>
            <DialogActions>
                <CancelDialogButton onClick={handleClose}>
                    Cancel
                </CancelDialogButton>
                <ApplyDialogButton onClick={handleAddFolder}>
                    Add
                </ApplyDialogButton>
            </DialogActions>
        </Dialog>
    );
};

export default SetFolderDialog;