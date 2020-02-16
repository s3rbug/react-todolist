import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";

type DroppableItemPropsType = {
  classes: any;
  droppableId: string;
  children: React.ReactChild;
};

function DroppableItem({
  classes,
  droppableId,
  children
}: DroppableItemPropsType) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided: DroppableProvided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classes ? classes.drop : ""}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default DroppableItem;
