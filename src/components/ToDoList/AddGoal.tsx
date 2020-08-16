import React from "react";
import { Theme, StyleRules, makeStyles } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { reduxForm, InjectedFormProps, Field } from "redux-form";
import { TaskFormDataType } from "../../types/index_d";
import { RenderTextField, RenderIconButton } from "../../assets/FormRenders";
import { maxLength30, required } from "../../utils/validators";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			width: "100%",
			height: "100%",
			display: "flex",
			borderTop: "2px solid " + theme.palette.primary.main,
			flexDirection: "row",
			padding: "10px",
		},
		textField: {
			marginRight: "10px",
			width: "90%",
		},
		sendButton: {
			border: "1px solid darkgrey",
			marginTop: "7px",
			height: "40px",
			width: "40px",
			padding: "7px",
			flexGrow: 1,
		},
	})
);

type PropsType = {};

const AddGoal: React.FC<
	InjectedFormProps<TaskFormDataType, PropsType> & PropsType
> = (props) => {
	const { handleSubmit } = props;
	const classes = useStyles();
	return (
		<form onSubmit={handleSubmit} className={classes.root}>
			<Field
				name="goal"
				className={classes.textField}
				placeholder="Add goal"
				label="Add goal"
				margin="dense"
				type="text"
				component={RenderTextField}
				validate={[required, maxLength30]}
				variant="outlined"
			/>
			<Field
				name="submitGoal"
				type="submit"
				Icon={ArrowUpwardIcon}
				component={RenderIconButton}
				className={classes.sendButton}
				iconColor="primary"
			/>
		</form>
	);
};

const AddGoalReduxForm = reduxForm<TaskFormDataType, PropsType>({})(AddGoal);

export default AddGoalReduxForm;
