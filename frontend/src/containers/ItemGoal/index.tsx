import { useState, ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import { GoalType } from "../../types/index_d"
import { TaskDetails } from "./TaskDetails"
import { useTypedSelector } from "../../redux/store"
import { Goal } from "../../components"

type PropsType = {
	goal: GoalType
	folderId: string
	toggleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ItemGoal = ({ goal, folderId, toggleCheckbox }: PropsType) => {
	const [open, setOpen] = useState(false)
	const tags = useTypedSelector((state) => state.goal.tags)

	const currentTag = tags.find((tag) => tag.id === goal.tagId)

	return (
		<>
			<ListItem
				sx={{
					position: "relative",
					borderBottom: 1,
					borderTop: 1,
					borderColor: "action.selected",
					boxShadow: 3,
					cursor: "default",
					zIndex: 0,
					overflow: "hidden",
					borderLeft:
						currentTag?.color === undefined
							? "none"
							: `4px solid ${currentTag?.color}`,
				}}
			>
				<Goal
					handleClick={() => setOpen(true)}
					toggleCheckbox={toggleCheckbox}
					currentTag={currentTag}
					goal={goal}
				/>
			</ListItem>
			<TaskDetails
				open={open}
				setOpen={setOpen}
				goal={goal}
				tags={tags}
				folderId={folderId}
			/>
		</>
	)
}
