import {
	Button,
	ButtonProps,
} from "@mui/material";

export const CancelDialogButton = (props: ButtonProps) => {

	return (
		<Button
			{...props}
			sx={{
				...props.sx,
				color: "action.active",
				fontWeight: "bold"
			}}
		/>
	);
};

export const DeleteDialogButton = (props: ButtonProps) => {

	return (
		<Button
			{...props}
			sx={{
				...props.sx,
				fontWeight: "bold"
			}}
			variant="contained"
			color="secondary"
		/>
	);
};

export const ApplyDialogButton = (props: ButtonProps) => {

	return (
		<Button
			{...props}
			sx={{
				...props.sx,
				fontWeight: "bold"
			}}
			variant="contained"
			color="primary"
		/>
	);
};
