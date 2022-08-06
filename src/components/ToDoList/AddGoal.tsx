import React, { useState, useRef } from "react";
import {
	Theme,
	StyleRules,
	makeStyles,
	IconButton,
	useTheme,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { TaskFormDataType } from "../../types/index_d";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import BorderlessInput from "../../assets/BorderlessInput";
import clsx from "clsx";
import { addGoal } from "../../redux/middleware/goal";
import { useTypedDispatch } from "../../redux/reduxStore";

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
			flexGrow: 1,
			border: "1px solid darkgrey",
			borderRadius: "20px",
			padding: "6px",
			height: "40px",
		},
		sendButton: {
			border: "1px solid darkgrey",
			height: "40px",
			width: "40px",
			padding: "7px",
			"&:hover, &:active": {
				background: theme.palette.primary.main,
				border: "none",
			},
			"&:hover *, &:active *": {
				color: "white",
			},
			transition: "all .4s",
		},
		icon: {
			alignSelf: "center",
		},
		focusedButton: {
			background: theme.palette.primary.main,
			border: "none",
			"& svg": {
				color: "white",
			},
		},
		input: {
			width: "100%",
			height: "100%",
			padding: "5px",
			fontSize: "1.1em",
			background: "transparent",
			color: theme.palette.text.primary,
		},
	})
);

type PropsType = {
	folderId: string;
};

const AddGoal = ({ folderId }: PropsType) => {
	const classes = useStyles();
	const dispatch = useTypedDispatch();
	const theme = useTheme();
	const textField = useRef<null | HTMLInputElement>(null);
	const [moving, setMoving] = useState(false);
	const [focused, setFocused] = useState(false);
	const props = useSpring({
		to: [
			{
				opacity: 1,
				transform: "translate3d(0, -10px, 0 )",
				immediate: false,
				config: {
					mass: 3,
					tension: 700,
					friction: 40,
					velocity: 30,
					clamp: true,
				},
			},
			{
				opacity: 0,
				transform: "translate3d(0, 20px, 0 )",
				immediate: true,
			},
			{
				opacity: 1,
				transform: "translate3d(0, 0, 0)",
				immediate: false,
				config: { mass: 1, tension: 400, friction: 40, velocity: 30 },
			},
		],
		onRest: () => {
			setMoving(false);
		},
	});

	const props2 = useSpring({
		to: [
			{
				opacity: 0,
				transform: "translate3d(0, -10px, 0 )",
				immediate: false,
				config: {
					mass: 3,
					tension: 700,
					friction: 40,
					velocity: 30,
					clamp: true,
				},
			},
			{
				opacity: 0,
				transform: "translate3d(0, 20px, 0 )",
				immediate: true,
			},
			{
				opacity: 1,
				transform: "translate3d(0, 0, 0)",
				immediate: false,
				config: { mass: 1, tension: 400, friction: 40, velocity: 30 },
			},
		],
		onRest: () => {
			setMoving(false);
		},
	});
	const handleOffFocus = () => {
		if (!moving) {
			setFocused(false);
		} else {
			textField.current?.focus();
		}
	}

	const onSubmit = (data: TaskFormDataType) => {
		dispatch(addGoal(folderId, data.goalText))
		textField.current?.focus();
		setValue("goalText", "");
		if (!errors.goalText?.message) 
			setMoving(true);
		else
			setMoving(false);
	};

	const { register, handleSubmit, formState: { errors }, setValue } = useForm<
		TaskFormDataType
	>();
	return (
		<form
			key={folderId}
			onSubmit={handleSubmit(onSubmit)}
			className={classes.root}
		>
			<div
				style={{
					borderColor: !!errors.goalText
						? theme.palette.secondary.main
						: focused
						? theme.palette.primary.main
						: "darkgrey",
					borderWidth: !!errors.goalText || focused ? "2px" : "1px",
				}}
				className={classes.textField}
			>
				<animated.div
					key={`animated.div-${folderId}`}
					style={moving ? props2 : {}}
				>
					<BorderlessInput
						{...register("goalText", 
						{required: {value: true, message: "Goal text can not be empty"}}
						)}
						placeholder="Add goal"
						className={classes.input}
						onFocus={() => setFocused(true)}
						onBlur={handleOffFocus}
					/>
				</animated.div>
			</div>

			<IconButton
				className={
					clsx(
						classes.sendButton,
						focused && classes.focusedButton
					)
				}
				color="primary"
				type="submit"
			>
				<animated.div
					key={`animated.div-${folderId}`}
					style={moving ? props : {}}
				>
					<ArrowUpwardIcon className={classes.icon} />
				</animated.div>
			</IconButton>
		</form>
	);
};

export default AddGoal;
