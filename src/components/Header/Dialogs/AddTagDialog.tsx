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
import { combineStyles } from "../../../utils/helpers";

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
		picker: {
			width: "400px",
		},
	})
);

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	addTag: (name: string, color: string) => void;
};

const AddTagDialog = ({ open, setOpen, addTag }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();
	const [checked, setChecked] = useState(false);
	const [color, setColor] = useState(theme.palette.primary.main);
	const [tagName, setTagName] = useState("New tag");
	const handleClose = () => {
		setOpen(false);
	};
	const toggleCheckbox = () => {
		setChecked(!checked);
	};
	const handleChangeComplete = (
		newColor: ColorResult,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		console.log(newColor, event);
		setColor(newColor.hex);
	};
	const handleChange = (newColor: ColorResult) => {
		setColor(newColor.hex);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTagName(e.target.value);
	};
	const handleAddTag = () => {
		addTag(tagName, color);
		setOpen(false);
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle className={classes.title}>
				<Input
					value={tagName}
					style={{ fontSize: "1.6em" }}
					onChange={handleInputChange}
				/>
			</DialogTitle>
			<DialogContent>
				<div
					className={classes.item}
					style={{ borderLeft: "4px solid " + color }}
				>
					<span
						className={combineStyles([
							checked ? classes.checked : "",
							classes.notSelectable,
						])}
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
					className={classes.picker}
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
