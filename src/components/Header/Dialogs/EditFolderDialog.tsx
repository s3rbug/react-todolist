import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, Input } from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";

type PropsType = {
    headline: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    editFolder: (newHeadline: string, folderId: number) => void;
    folderId: number;
};

const EditFolderDialog = ({
    open,
    setOpen,
    headline,
    editFolder,
    folderId,
}: PropsType) => {
    const [newHeadline, setNewHeadline] = useState(headline);
    useEffect(() => {
        setNewHeadline(headline);
    }, [headline]);
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewHeadline(e.target.value);
    };
    const handleSave = () => {
        editFolder(newHeadline, folderId);
        handleClose();
    };
    return (
        <Dialog open={open}>
            <DialogTitle>
                <Input value={newHeadline} onChange={handleChange} />
            </DialogTitle>
            <DialogActions>
                <CancelDialogButton onClick={handleClose}>
                    Cancel
                </CancelDialogButton>
                <ApplyDialogButton onClick={handleSave}>
                    Apply
                </ApplyDialogButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditFolderDialog;
