import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import SetGoalForm from "./SetGoalForm";
import { TaskFormDataType } from "../../../types/index_d";

type PropsType = {
  handleAddButton: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  addGoal: (text: string) => void;
};

function AddTaskDialog({ handleAddButton, open, setOpen, addGoal }: PropsType) {
  const onSubmit = (formData: TaskFormDataType) => {
    addGoal(formData.goalText);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleAddButton}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add a new goal</DialogTitle>
      <SetGoalForm setOpen={setOpen} onSubmit={onSubmit} />
    </Dialog>
  );
}

export default AddTaskDialog;
