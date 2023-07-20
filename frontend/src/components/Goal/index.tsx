import {
	Box,
	ListItem,
	Tooltip,
	ListItemSecondaryAction,
	Checkbox,
} from "@mui/material"
import { GoalType, TagType } from "../../types/index_d"
import { ChangeEvent } from "react"

type PropsType = {
	handleClick?: () => void
	toggleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
	currentTag?: TagType
	goal: GoalType
}

export const Goal = ({
	handleClick,
	currentTag,
	goal,
	toggleCheckbox,
}: PropsType) => {
	return (
		<Box onClick={handleClick}>
			<Tooltip title={currentTag?.name || ""} placement="right" arrow>
				<Box
					sx={{
						textDecoration: goal.checked ? "line-through" : "none",
						opacity: goal.checked ? 0.95 : 1,
						color: goal.checked ? "text.secondary" : "text.primary",
						userSelect: "none",
					}}
				>
					{goal.text}
				</Box>
			</Tooltip>
			<ListItemSecondaryAction>
				<Checkbox
					color="secondary"
					edge="end"
					checked={goal.checked}
					onChange={toggleCheckbox}
					value={goal.id}
				/>
			</ListItemSecondaryAction>
		</Box>
	)
}
