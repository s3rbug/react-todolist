import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

type DroppableItemPropsType = {
  className?: string;
  droppableId: string;
  children: React.ReactChild;
};

function DroppableItem({
  className,
  droppableId,
  children
}: DroppableItemPropsType) {
  return (
    <Droppable droppableId={droppableId}>
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
}

export default DroppableItem;
