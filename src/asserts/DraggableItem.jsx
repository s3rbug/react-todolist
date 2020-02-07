import React from "react";
import { Draggable } from "react-beautiful-dnd";

function DraggableItem({ el, children }) {
  return (
    <Draggable key={el.id} draggableId={"item-" + el.id} index={el.id}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
