import React from "react";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {}
}));

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
      <CardContent>
        <TextField
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
            setErrorDesc("");
            setErrorHead("");
          }}
        ></TextField>
      </CardContent>
    </div>
  );
}

export default Folder;
