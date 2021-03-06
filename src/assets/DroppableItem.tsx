import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

type DroppableItemPropsType = {
	className?: string;
	horizontal?: boolean;
	droppableId: string;
	children: React.ReactChild;
};

const DroppableItem = ({
	className,
	horizontal,
	droppableId,
	children,
}: DroppableItemPropsType) => {
	return (
		<Droppable
			droppableId={droppableId}
			direction={horizontal ? "horizontal" : "vertical"}
		>
			{(provided: DroppableProvided) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
					className={className}
				>
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default DroppableItem;
