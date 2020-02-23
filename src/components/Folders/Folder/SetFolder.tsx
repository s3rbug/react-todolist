import React from "react";
import TextField from "@material-ui/core/TextField";
import { DialogContent } from "@material-ui/core";

type PropsType = {
  curHeadline: string;
  setCurHeadline: (a: string) => void;
  curDescription: string;
  setCurDescription: (a: string) => void;
  errorDesc: string;
  errorHead: string;
  setErrorDesc: (a: string) => void;
  setErrorHead: (a: string) => void;
};

const SetFolder = ({
  curHeadline,
  setCurHeadline,
  curDescription,
  setCurDescription,
  errorDesc,
  errorHead,
  setErrorDesc,
  setErrorHead
}: PropsType) => {
  const clearError = () => {
    setErrorDesc("");
    setErrorHead("");
  };
  return (
    <DialogContent>
      <TextField
        autoFocus
        error={!!errorHead}
        helperText={errorHead}
        margin="dense"
        id="headline"
        label="Headline"
        fullWidth
        value={curHeadline}
        onChange={e => {
          setCurHeadline(e.target.value);
          clearError();
        }}
      ></TextField>
      <TextField
        error={!!errorDesc}
        helperText={errorDesc}
        margin="dense"
        id="description"
        label="Description"
        fullWidth
        value={curDescription}
        onChange={e => {
          setCurDescription(e.target.value);
          clearError();
        }}
      ></TextField>
    </DialogContent>
  );
};

export default SetFolder;
