import { useState, useRef } from "react";
import {
	IconButton,
	Box,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { TaskFormDataType } from "../../types/index_d";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { addGoal } from "../../redux/middleware/goal";
import { useTypedDispatch } from "../../redux/reduxStore";

type PropsType = {
	folderId: string;
};

const AddGoal = ({ folderId }: PropsType) => {

	const dispatch = useTypedDispatch();
	const textField = useRef<null | HTMLInputElement>(null);	
	const [isMoving, setMoving] = useState(false);
	const [focused, setFocused] = useState(false);
	const states = [
		{},
		{
			to: [
				{opacity: 0, marginBottom: "25px"},
				{marginBottom: "-25px"},
				{opacity: 1, marginBottom: "0"},
			],
			config: {tension: 400, friction: 20, clamp: true},
			onRest: () => {
				setMoving(false)
			}
		}
	];
	const arrowAnimationProps = useSpring({
		...states[+isMoving]
	})

	const handleOffFocus = () => {
		setFocused(false);
	}

	const onSubmit = (data: TaskFormDataType) => {
		dispatch(addGoal(folderId, data.goalText))
		textField.current?.focus();
		setValue("goalText", "");
		if (!errors.goalText?.message) 
			setMoving(true);
	};

	const { register, handleSubmit, formState: { errors }, setValue } = useForm<
		TaskFormDataType
	>();
	return (
        <Box
			component={"form"}
			key={folderId}
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				borderTop: theme => `2px solid ${theme.palette.primary.main}`,
				flexDirection: "row",
				padding: 1.25,
				pt: 1.75
			}}
		>
			<Box
				sx={{
					marginRight: 1,
					flexGrow: 1,
					border: "1px solid darkgrey",
					borderRadius: 5,
					pt: 1,
					pl: 1.5,
					height: 40,
					borderColor: !!errors.goalText
						? "secondary.main"
						: focused
						? "primary.main"
						: "darkgrey",
					borderWidth: !!errors.goalText || focused ? 2 : 1,
				}}
			>
				<animated.div
					key={`animated.div-${folderId}`}
				>
					<Box
						{...register("goalText", 
						{required: {value: true, message: "Goal text can not be empty"}}
						)}
						component="input"
						placeholder="Add goal"
						sx={{	
							backgroundColor: "transparent",
							width: "100%",
							height: "100%",
							fontSize: "1em",
							border: "none", 
							outline: "none",
							color: "text.primary"
						}}
						onFocus={() => setFocused(true)}
						onBlur={handleOffFocus}
					/>
				</animated.div>
			</Box>
			<IconButton
				sx={{
					border: focused ? "none" : "1px solid darkgrey",
					height: 40,
					width: 40,
					padding: 2,
					"&:hover, &:active": {
						backgroundColor: "primary.main",
						border: "none",
					},
					"&:hover *, &:active *": {
						color: "white",
					},
					transition: "all .4s",
					backgroundColor: focused ? "primary.main" : "none",
					"& svg": {
						color: focused ? "white" : "primary.main"
					}
				}}
				color="primary"
				type="submit"
			>
				<animated.div
					key={`animated.div-${folderId}`}
					style={arrowAnimationProps}
				>
					<ArrowUpwardIcon sx={{alignSelf: "center"}} />
				</animated.div>
			</IconButton>
		</Box>
    );
};

export default AddGoal;
