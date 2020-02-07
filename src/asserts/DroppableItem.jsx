import React from "react";
import { Droppable } from "react-beautiful-dnd";

function DroppableItem({ classes, droppableId, children }) {
  return (
    <Droppable droppableId={droppableId}>
      {provided => (
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
