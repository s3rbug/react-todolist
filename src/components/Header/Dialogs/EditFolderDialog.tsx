import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, Input } from "@material-ui/core";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";
import { useDispatch } from "react-redux";
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
    useEffect(() => {
        setNewHeadline(headline);
    }, [headline]);
    const editFolder = (newName: string, folderIdEdit: number) =>
        dispatch(editFolderAction(newName, folderIdEdit));
    const handleClose = () => {
        setNewHeadline(headline);
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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Input
                    style={{ fontSize: "1.6em" }}
                    value={newHeadline}
                    onChange={handleChange}
                />
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
