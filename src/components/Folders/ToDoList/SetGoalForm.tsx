import React from "react";
import { InjectedFormProps, Field, reduxForm } from "redux-form";
import { RenderTextField } from "../../../assets/FormRenders";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { TaskFormDataType } from "../../../types/index_d";
import { required, maxLength50 } from "../../../utils/validators";
import { ApplyDialogButton, CancelDialogButton } from "../../../assets/Buttons";

type PropsType = {
    setOpen: (isOpen: boolean) => void;
};

const SetGoalForm: React.FC<
    InjectedFormProps<TaskFormDataType, PropsType> & PropsType
> = (props) => {
    const { handleSubmit, setOpen } = props;
    return (
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <DialogContentText>
                    To accomplish your goals you need to know how to set them.
                    You can't simply expect it to happen. Goal setting is a
                    process that starts with careful consideration of what you
                    want to achieve, and ends with a lot of hard work to
                    actually do it.
                </DialogContentText>
                <Field
                    name="goalText"
                    fullWidth
                    autoFocus
                    placeholder="Add goal"
                    label="Add goal"
                    margin="dense"
                    type="text"
                    component={RenderTextField}
                    validate={[required, maxLength50]}
                />
            </DialogContent>
            <DialogActions>
                <Field
                    name="cancel"
                    component={CancelDialogButton}
                    color="secondary"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Field>
                <Field
                    component={ApplyDialogButton}
                    name="addGoal"
                    color="primary"
                    type="submit"
                    variant="contained"
                >
                    Add
                </Field>
            </DialogActions>
        </form>
    );
};

const SetFolderReduxForm = reduxForm<TaskFormDataType, PropsType>({
    form: "set-goal",
})(SetGoalForm);
export default SetFolderReduxForm;
