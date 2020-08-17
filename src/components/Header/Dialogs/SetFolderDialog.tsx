import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    Input,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";

type PropsType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    addFolder: (headline: string) => void;
};

const SetFolderDialog = ({ open, setOpen, addFolder }: PropsType) => {
    const [headline, setHeadline] = useState("");
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
                <span style={{ fontSize: "1.2em" }}>Add folder</span>
            </DialogTitle>
            <DialogContent>
                <Input
                    style={{ fontSize: "1.5em" }}
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
