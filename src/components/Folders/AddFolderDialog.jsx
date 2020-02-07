import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SetFolder from "./Folder/SetFolder";

function AddFolderDialog({
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
}) {
  return (
    <Dialog
      className={classes.addFolderDialog}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-folders"
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
}

export default AddFolderDialog;
