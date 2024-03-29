import { Box, Tooltip, ListItemSecondaryAction, Checkbox } from "@mui/material"
import { GoalType, TagType } from "../../redux/types/goal"

type PropsType = {
	handleClick?: () => void
	toggleCheckbox: (goalId?: string) => void
	currentTag?: TagType
	goal: GoalType
}

export const Goal = ({
	handleClick,
	currentTag,
	goal,
	toggleCheckbox,
}: PropsType) => {
	const toggleCheckboxNoPropagation = (
		event: React.MouseEvent<HTMLElement>
	) => {
		event.stopPropagation()
		toggleCheckbox(goal.id)
	}
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
					onClick={toggleCheckboxNoPropagation}
					value={goal.id}
				/>
			</ListItemSecondaryAction>
		</Box>
	)
}
