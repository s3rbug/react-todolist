import React from "react";
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
	children: React.ReactChild;
	getItemStyle?: (
		isDragging: boolean,
		draggableProps: DraggingStyle | NotDraggingStyle | undefined
	) => object;
};

const DraggableItem = ({
	draggableId,
	className,
	children,
	getItemStyle,
	index,
}: DraggableItemPropsType) => {
	return (
		<Draggable draggableId={`item-${draggableId}`} index={index}>
			{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={
						getItemStyle
							? getItemStyle(snapshot.isDragging, provided.draggableProps.style)
							: undefined
					}
					className={className}
				>
					{children}
				</div>
			)}
		</Draggable>
	);
};

export default DraggableItem;
