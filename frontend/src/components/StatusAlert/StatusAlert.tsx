import { Alert, Button, Fade } from "@mui/material"
import { useTypedDispatch, useTypedSelector } from "../../redux/reduxStore";
import { uiActions } from "../../redux/slices/ui";

type PropsType = {
    text: string,
    buttonText: string,
}

const StatusAlert = ({text, buttonText}: PropsType) => {
    const dispatch = useTypedDispatch()
    const open = useTypedSelector(state => state.ui.showStatusAlert)
    const hideAlert = () => {
        dispatch(uiActions.setShowStatusAlert({showStatusAlert: false}))
    }
    return (
			<Fade in={open}>
				<Alert
					severity="info"
					sx={{
						position: "fixed",
						bottom: 10,
						right: 10,
					}}
					action={
						<Button color="inherit" size="small" onClick={hideAlert}>
							{buttonText}
						</Button>
					}
				>
					{text}
				</Alert>
			</Fade>
		);
}

export default StatusAlert