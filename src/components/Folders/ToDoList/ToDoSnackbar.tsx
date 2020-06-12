import React from "react";
import { Snackbar, Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type PropsType = {
  message: string;
  undoDeleteTasks: () => void;
  show: boolean;
  setShow: (show: boolean) => void;
  countDeleted: number;
};

const ToDoSnackbar = ({
  setShow,
  show,
  message,
  undoDeleteTasks,
  countDeleted
}: PropsType) => {
  if (countDeleted !== 0)
    return (
      <Snackbar
        open={show}
        message={message}
        autoHideDuration={6000}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={undoDeleteTasks}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShow(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        onClose={() => setShow(false)}
      />
    );
  else return null;
};

export default ToDoSnackbar;
