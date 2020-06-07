import React, { useState, useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

type PropsType = {
  handleAddButton: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  addGoal: (text: string) => void;
};

const AddTaskDialog = ({
  handleAddButton,
  open,
  setOpen,
  addGoal
}: PropsType) => {
  const [hasError, setError] = useState("");
  const [currentText, setCurrentText] = useState("");

  const handleAddNewGoal = useCallback(() => {
    if (currentText !== "") {
      addGoal(currentText);
      setCurrentText("");
      setOpen(false);
    } else {
      setError("Field can not be empty");
    }
  }, [addGoal, setCurrentText, setOpen, currentText]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddNewGoal();
      } else if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
      }
    },
    [setOpen, handleAddNewGoal]
  );
  const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setCurrentText(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleAddButton}
      aria-labelledby="form-dialog-title"
      onKeyDown={onKeyDown}
    >
      <DialogTitle id="form-dialog-title">Add a new goal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To accomplish your goals you need to know how to set them. You can't
          simply expect it to happen. Goal setting is a process that starts with
          careful consideration of what you want to achieve, and ends with a lot
          of hard work to actually do it.
        </DialogContentText>
        <TextField
          error={!!hasError}
          helperText={hasError}
          autoFocus
          margin="dense"
          id="name"
          label="Add goal"
          fullWidth
          type="text"
          onChange={textChanged}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddButton} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddNewGoal} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;