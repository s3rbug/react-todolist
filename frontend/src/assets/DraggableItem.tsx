import { Box } from "@mui/material";
import { ReactNode } from "react";
import {
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	NotDraggingStyle,
	DraggingStyle,
} from "react-beautiful-dnd";

type DraggableItemPropsType = {
	draggableId: string;
	index: number;
	className?: string;
	children: ReactNode;
	getDraggableSx?: (
		isDragging: boolean,
		draggableProps: DraggingStyle | NotDraggingStyle | undefined
	) => object;
};

const DraggableItem = ({
	draggableId,
	className,
	children,
	getDraggableSx,
	index,
}: DraggableItemPropsType) => {
	return (
		<Draggable draggableId={`item-${draggableId}`} index={index}>
			{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
				<Box
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={
						getDraggableSx
							? getDraggableSx(snapshot.isDragging, provided.draggableProps.style)
							: {}
					}
					className={className}
				>
					{children}
				</Box>
			)}
		</Draggable>
	);
};

export default DraggableItem;
