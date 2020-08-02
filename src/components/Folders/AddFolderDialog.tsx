import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import SetFolderForm from "./Folder/SetFolderForm";
import { FoldersStyleType } from "./Folders";
import { DialogContent } from "@material-ui/core";
import { FormDataType } from "./../../types/index_d";

type PropsType = {
  classes: FoldersStyleType;
  open: boolean;
  setOpen: (open: boolean) => void;
  addFolder: (headline: string, description: string) => void;
};

const AddFolderDialog = ({ classes, open, setOpen, addFolder }: PropsType) => {
  const onSubmit = (formData: FormDataType) => {
    addFolder(formData.headline, formData.description);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-folders"
    >
      <DialogTitle id="form-dialog-folders">Add new folder</DialogTitle>
      <DialogContent>
        <SetFolderForm onSubmit={onSubmit} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFolderDialog;
