import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

type DraggableItemPropsType = {
	id: number;
	className?: string;
	children: React.ReactChild;
	adding: string;
};

const DraggableItem = ({
	adding,
	id,
	className,
	children,
}: DraggableItemPropsType) => {
	return (
		<Draggable draggableId={"item-" + adding + id} index={id}>
			{(provided: DraggableProvided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={className}
				>
					{children}
				</div>
			)}
		</Draggable>
	);
};

export default DraggableItem;
