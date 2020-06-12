import React, { useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SetFolder from "./Folder/SetFolder";
import { FoldersStyleType } from "./Folders";

type PropsType = {
  classes: FoldersStyleType;
  open: boolean;
  setOpen: (open: boolean) => void;
  curHeadline: string;
  setCurHeadline: (newHeadline: string) => void;
  curDescription: string;
  setCurDescription: (newDescription: string) => void;
  errorHead: string;
  errorDesc: string;
  setErrorHead: (newErrorHead: string) => void;
  setErrorDesc: (newErrorDesc: string) => void;
  handleAddButton: () => void;
};

const AddFolderDialog = ({
  classes,
  open,
  setOpen,
  curHeadline,
  setCurHeadline,
  curDescription,
  setCurDescription,
  errorHead,
  errorDesc,
  setErrorHead,
  setErrorDesc,
  handleAddButton
}: PropsType) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddButton();
      } else if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
      }
    },
    [setOpen, handleAddButton]
  );
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-folders"
      onKeyDown={onKeyDown}
    >
      <DialogTitle id="form-dialog-folders">Add new folder</DialogTitle>
      <SetFolder
        curHeadline={curHeadline}
        setCurHeadline={setCurHeadline}
        curDescription={curDescription}
        setCurDescription={setCurDescription}
        errorHead={errorHead}
        errorDesc={errorDesc}
        setErrorHead={setErrorHead}
        setErrorDesc={setErrorDesc}
      />
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddButton} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFolderDialog;
