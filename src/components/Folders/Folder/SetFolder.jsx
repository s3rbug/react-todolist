import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { DialogContent } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

function Folder({
  curHeadline,
  setCurHeadline,
  curDescription,
  setCurDescription,
  errorDesc,
  errorHead,
  setErrorDesc,
  setErrorHead
}) {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <DialogContent>
        <TextField
          className={classes.textField}
          error={!!errorHead}
          helperText={errorHead}
          margin="dense"
          id="headline"
          label="Headline"
          fullWidth
          value={curHeadline}
          onChange={e => {
            setCurHeadline(e.target.value);
            setErrorDesc("");
            setErrorHead("");
          }}
        ></TextField>
      </DialogContent>
      <DialogContent>
        <TextField
          className={classes.textField}
          error={!!errorDesc}
          helperText={errorDesc}
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          value={curDescription}
          onChange={e => {
            setCurDescription(e.target.value);
            setErrorDesc("");
            setErrorHead("");
          }}
        ></TextField>
      </DialogContent>
    </div>
  );
}

export default Folder;
