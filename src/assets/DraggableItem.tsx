import React from "react";
import {
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	NotDraggingStyle,
	DraggingStyle,
} from "react-beautiful-dnd";

type DraggableItemPropsType = {
	id: number;
	className?: string;
	children: React.ReactChild;
	adding: string;
	getItemStyle?: (
		isDragging: boolean,
		draggableProps: DraggingStyle | NotDraggingStyle | undefined
	) => object;
};

const DraggableItem = ({
	adding,
	id,
	className,
	children,
	getItemStyle,
}: DraggableItemPropsType) => {
	return (
		<Draggable draggableId={"item-" + adding + id} index={id}>
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
