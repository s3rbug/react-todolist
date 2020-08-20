import React, { useState } from "react";
import {
    Theme,
    StyleRules,
    makeStyles,
    TextField,
    IconButton,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { TaskFormDataType } from "../../types/index_d";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addGoalAction } from "../../redux/actions/todo";

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
        },
        sendButton: {
            border: "1px solid darkgrey",
            marginTop: "7px",
            height: "40px",
            width: "40px",
            padding: "7px",
        },
        icon: {
            alignSelf: "center",
        },
    })
);

type PropsType = {
    folderId: number;
};

const AddGoal = ({ folderId }: PropsType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const addGoal = (newGoal: string, folderId: number) =>
        dispatch(addGoalAction(newGoal, folderId));
    const [moving, setMoving] = useState(false);
    const props = useSpring({
        to: [
            {
                opacity: 0,
                transform: "translateY(-10px)",
                immediate: false,
                config: { tension: 400 },
            },
            {
                opacity: 0,
                transform: "translateY(10px)",
                immediate: true,
                config: { tension: 40000 },
            },
            {
                opacity: 1,
                transform: "translateY(0)",
                immediate: false,
                config: { tension: 500 },
            },
        ],
        onRest: () => {
            setMoving(false);
        },
    });

    const onSubmit = (data: TaskFormDataType) => {
        addGoal(data.goalText, folderId);
        setValue("goalText", "");
        if (!errors.goalText?.message) setMoving(true);
    };

    const { register, handleSubmit, errors, setValue } = useForm<
        TaskFormDataType
    >();
    return (
        <form
            key={folderId}
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
        >
            <TextField
                name="goalText"
                className={classes.textField}
                placeholder="Add goal"
                margin="dense"
                type="text"
                variant="outlined"
                inputRef={register({
                    required: "Goal can not be empty",
                    maxLength: {
                        value: 30,
                        message: "Max goal length is 30",
                    },
                })}
                error={!!errors.goalText}
                helperText={errors.goalText?.message}
                inputProps={{
                    form: {
                        autocomplete: "off",
                    },
                }}
            />

            <IconButton
                className={classes.sendButton}
                color="primary"
                type="submit"
            >
                <animated.div
                    key={"animated.div" + folderId}
                    style={moving ? props : {}}
                >
                    <ArrowUpwardIcon className={classes.icon} />
                </animated.div>
            </IconButton>
        </form>
    );
};

export default AddGoal;
