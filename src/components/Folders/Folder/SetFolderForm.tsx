import React from "react";
import { DialogActions, Button } from "@material-ui/core";
import { InjectedFormProps, reduxForm, Field } from "redux-form";
import { FormDataType } from "./../../../types/index_d";
import { RenderTextField } from "../../../assets/FormRenders";
import { required, maxLength15 } from "../../../utils/validators";

type PropsType = {
  setOpen: (open: boolean) => void;
};

const SetFolderForm: React.FC<
  InjectedFormProps<FormDataType, PropsType> & PropsType
> = (props) => {
  const { handleSubmit, setOpen } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          autoFocus
          fullWidth
          name="headline"
          component={RenderTextField}
          label="Headline"
          margin="dense"
          placeholder="Headline"
          validate={[required, maxLength15]}
        />
      </div>
      <div>
        <Field
          fullWidth
          name="description"
          component={RenderTextField}
          label="Description"
          margin="dense"
          placeholder="Description"
          validate={[required, maxLength15]}
        ></Field>
      </div>
      <DialogActions>
        <Field
          component={Button}
          name="cancel"
          color="secondary"
          type="button"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Field>
        <Field component={Button} name="add" color="primary" type="submit">
          Add
        </Field>
      </DialogActions>
    </form>
  );
};

const SetFolderReduxForm = reduxForm<FormDataType, PropsType>({
  form: "set-folder",
})(SetFolderForm);
export default SetFolderReduxForm;
