import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Input,
	DialogActions,
	Checkbox,
	Theme,
	StyleRules,
	makeStyles,
	useTheme,
} from "@material-ui/core";
import { ColorResult, HuePicker } from "react-color";
import { CancelDialogButton, ApplyDialogButton } from "../../../assets/Buttons";
import clsx from "clsx";
import { addTag } from "../../../redux/middleware/goal";
import { useTypedDispatch } from "../../../redux/reduxStore";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		item: {
			width: "100%",
			height: "100%",
			position: "relative",
			borderBottom: "1px solid " + theme.palette.action.selected,
			borderTop: "1px solid " + theme.palette.action.selected,
			boxShadow: theme.shadows[3],
			cursor: "default",
			zIndex: 0,
			display: "flex",
			marginBottom: "20px",
			paddingRight: "15px",
			paddingLeft: "15px",
		},
		checked: {
			textDecoration: "line-through",
		},
		notSelectable: {
			userSelect: "none",
			alignSelf: "center",
			flexGrow: 1,
		},
		title: {
			width: "400px",
		},
	})
);

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const AddTagDialog = ({ open, setOpen }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useTypedDispatch()

	const [checked, setChecked] = useState(false);
	const [color, setColor] = useState(theme.palette.primary.main);
	const [tagName, setTagName] = useState("new tag");
	
	const handleClose = () => {
		setOpen(false);
	};
	const toggleCheckbox = () => {
		setChecked(!checked);
	};
	const handleChangeComplete = (newColor: ColorResult) => {
		setColor(newColor.hex);
	};
	const handleChange = (newColor: ColorResult) => {
		setColor(newColor.hex);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setTagName(e.target.value);
		}
	};
	const handleAddTag = () => {
		dispatch(addTag(tagName, color))
		setOpen(false);
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle className={classes.title}>
				<Input
					autoFocus
					value={tagName}
					style={{ fontSize: "1.6em" }}
					onChange={handleInputChange}
				/>
			</DialogTitle>
			<DialogContent>
				<div
					className={classes.item}
					style={{ borderLeft: `4px solid ${color}` }}
				>
					<span
						className={clsx(
							checked && classes.checked,
							classes.notSelectable
						)}
					>
						Example text
					</span>
					<div className={classes.checkbox}>
						<Checkbox
							edge="end"
							checked={checked}
							onChange={toggleCheckbox}
							value={0}
						/>
					</div>
				</div>
				<HuePicker
					width={"100%"}
					color={color}
					onChangeComplete={handleChangeComplete}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleAddTag}>Add</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default AddTagDialog;
